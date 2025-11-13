import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindByClientDto } from './dto/findByClient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  ILike,
  MoreThanOrEqual,
  Repository,
  DataSource,
  Equal,
  Raw,
} from 'typeorm';
import { Order } from './entities/order.entity';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { User } from 'src/user/entities/user.entity';

import { OrderStatusService } from 'src/order-status/order-status.service';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';
import { PedidoDTO } from './dto/create-order.dto copy';
import { ProductService } from 'src/product/product.service';
import { MercadoPagoConfig, Order as OrderMP, Payment } from 'mercadopago';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { v4 as uuidv4 } from 'uuid';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import axios from 'axios';
import { Cart } from 'src/cart/entities/cart.entity';
import pdf from 'html-pdf';
import { Readable } from 'stream';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { DeliveryType } from 'src/delivery-type/entities/delivery-type.entity';
import { InvoiceType } from 'src/invoice-type/entities/invoice-type.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderStatusService: OrderStatusService,
    private dataSource: DataSource,
    private productService: ProductService,
    private readonly configService: ConfigService
  ) {}

  async generatePDF(id: number) {
    const order = await this.orderRepository.findOneOrFail({
      where: { id: id },
      relations: ['detalles', 'detalles.producto'],
    });
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1,h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tfoot td { font-weight: bold; }
          
     
      .order-info {
        display: table;
        margin: 20px auto;
        width: auto;
      }

      .order-row {
        display: table-row;
      }

      .order-cell {
        display: table-cell;
        padding: 4px 12px;
        vertical-align: middle;
      }

      .label {
        font-weight: bold;
        text-align: right;
      }

          </style>
        </head>
        <body>
          <h1>LACUS PERU S.A.C </h1>  
          <h2>RUC: 20608508202 </h1>  
          <h2>Ticket: ${order.codigo}</h1>  
     <div class="order-info">
      <div class="order-row">
        <div class="order-cell label">Fecha:</div>
        <div class="order-cell">${order.fecha}</div>
        <div class="order-cell label">Hora:</div>
        <div class="order-cell">${order.hora}</div>
      </div>
      <div class="order-row">
        <div class="order-cell label">Subtotal:</div>
        <div class="order-cell">${order.subtotal}</div>
        <div class="order-cell label">Delivery Costo:</div>
        <div class="order-cell">${order.delivery_costo}</div>
      </div>
      <div class="order-row">
        <div class="order-cell label">Total:</div>
        <div class="order-cell">${order.total}</div>
      </div>
    </div>
    </div>

          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
            ${order.detalles
              .map(
                (d) => `
              <tr>
                <td>${d.producto.codigo}</td>
                <td>${d.producto.nombre}</td>
                <td>${Number(d.precio).toFixed(2)}</td>
                <td>${d.cantidad}</td>
                <td>${Number(d.subtotal).toFixed(2)}</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4"></td>
              <td>${Number(order.total).toFixed(2)}</td>
            </tr>
          </tfoot>

          </table>
        </body>
      </html>
    `;
    const stream: Buffer = await new Promise((resolve, reject) => {
      pdf.create(html).toBuffer(function (err, stream) {
        if (err) return reject(err);
        resolve(stream);
      });
    });

    return { codigo: order.codigo, pdf: stream };
  }
  async create(pedidoDTO: PedidoDTO) {
    const {
      carrito,
      metodo_pago,
      subtotal,
      delivery_costo,
      total,
      tipo_entrega,
      comprobante,
    } = pedidoDTO;

    if (carrito.detalles.length <= 0) {
      throw new Error('No hay productos en su carrito de compras');
    }

    const idsProductos = carrito.detalles.map((detail) => detail.producto.id);
    const stockProductos =
      await this.productService.findOnlyStockWithIdsForOrder(idsProductos);

    if (stockProductos.length <= 0) {
      throw new Error('No hay productos habilitados en su carrito de compras');
    }
    if (stockProductos.length < carrito.detalles.length) {
      throw new NotFoundException(
        'Algunos de los productos durante el proceso, no estan habilitados revise de nuevo su carrito de compras ',
      );
    }
    const errores: string[] = [];

    stockProductos.forEach((rawProduct) => {
      const detalle = carrito.detalles.find(
        (detalle) => detalle.producto.id === rawProduct.id,
      );
      if (detalle && Math.sign(rawProduct.stock - detalle.cantidad) === -1) {
        errores.push(
          `No hay suficiente stock del producto #${detalle.producto.nombre}`,
        );
      }
    });

    if (errores.length > 0) {
      throw new BadRequestException(errores.join(', '));
    }

    try {
      const { data } = await axios.post(
        `https://api.mercadopago.com/platforms/pci/yape/v1/payment?public_key=${this.configService.get<string>('MERCADO_PAGO_PUBLIC_KEY')}`,
        {
          phoneNumber: metodo_pago.yape.celular.toString(), // string
          otp: metodo_pago.yape.otp.toString().padStart(6, '0'), // string con 6 dígitos
          requestId: 'req-' + Date.now(), // string único
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      // Step 2: Initialize the client object
      const client = new MercadoPagoConfig({
        accessToken:
          `${this.configService.get<string>('MERCADO_PAGO_ACCESS_TOKEN')}`,
        options: { timeout: 5000 },
      });

      // payment
      const payment = new Payment(client);
      const { status, id } = await payment.create({
        requestOptions: {
          timeout: 5000,
          idempotencyKey: 'req' + uuidv4(),
        },
        body: {
          description: 'test_YAPE',
          installments: 1,
          payment_method_id: 'yape',
          payer: {
            email: carrito.usuario.correo,
          },
          token: data.id,
          transaction_amount: Number(total.toFixed(2)),
        },
      });
      // console.log(id);
      if (status !== 'approved') {
        throw new Error('Pago con Yape no realizado');
      }
    } catch (error) {
      throw new BadRequestException('Pago con Yape no realizado');
    }

    const result = await this.dataSource.transaction(async (manager) => {
      const now = new Date();
      const threeDaysLater = new Date(now);

      threeDaysLater.setDate(now.getDate() + 3);
      const entity = manager.create(Order, {
        codigo: uuidv4(),
        subtotal,
        delivery_costo,
        total,
        direccion:
          'coordenadas' in tipo_entrega
            ? `(${tipo_entrega.coordenadas.lat},${tipo_entrega.coordenadas.lng})`
            : `(-13.1738396,-74.2175546)`,
        estado_pedido: { id: 1 },
        metodo_pago: { id: 2 },
        usuario: { id: carrito.usuario.id },
        tipo_entrega: { id: tipo_entrega.id },
        fecha: now,
        hora: now,
        ultima_fecha: threeDaysLater,
      });
      const order = await manager.save(Order, entity);

      const operations = carrito.detalles.map((detail: CartDetail) => {
        const orderDetail = manager.create(OrderDetail, {
          producto: { id: detail.producto.id },
          precio: detail.producto.precio_final,
          cantidad: detail.cantidad,
          subtotal: detail.producto.precio_final * detail.cantidad,
          pedido: { id: order.id },
        });
        return manager.save(OrderDetail, orderDetail);
      });

      await Promise.all(operations);
      let comprobanteEntity: Invoice;
      if ('factura' in comprobante) {
        comprobanteEntity = manager.create(Invoice, {
          tipo_comprobante: { id: 2 },
          ruc: String(comprobante.factura.ruc).trim().toUpperCase(),
          razon_social: String(comprobante.factura.razon_social)
            .trim()
            .toUpperCase(),
          pedido: { id: order.id },
        });
        await manager.save(Invoice, comprobanteEntity);
      } else if ('boleta' in comprobante) {
        comprobanteEntity = manager.create(Invoice, {
          tipo_comprobante: { id: 1 },
          dni: String(comprobante.boleta.dni).trim().toUpperCase(),
          nombres: String(comprobante.boleta.nombres).trim().toUpperCase(),
          pedido: { id: order.id },
        });
        await manager.save(Invoice, comprobanteEntity);
      }

      await manager.delete(CartDetail, { carrito: { id: carrito.id } });
      carrito.updated_at = new Date();
      await manager.save(Cart, carrito);

      return order;
    });

    return [`This action adds a new entry #${result.id} and details`];
  }

  findAll() {
    return `This action returns all order`;
  }

  async findByClient(
    id: number,
    findByClientDto: FindByClientDto,
  ): Promise<[Order[], number]> {
    const {
      page,
      pageSize,
      searchByCode = undefined,
      startDate = undefined,
      endDate = undefined,
      orderStatus = undefined,
      deliveryType = undefined,
    } = findByClientDto;
    const where: any = {
      usuario: { id: id },
      ...(searchByCode && {
        codigo: Raw(() => `"Order"."codigo"::text ILIKE :codigo`, {
          codigo: `%${searchByCode.trim()}%`,
        }),
      }),

      ...(startDate && endDate
        ? { fecha: Between(startDate, endDate) }
        : startDate
          ? { fecha: Equal(startDate) }
          : endDate
            ? { fecha: Equal(endDate) }
            : undefined),

      ...(orderStatus && { estado_pedido: { id: orderStatus } }),
      ...(deliveryType && { tipo_entrega: { id: deliveryType } }),
    };
    return await this.orderRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
      relations: [
        'estado_pedido',
        'tipo_entrega',
        'comprobante',
        'comprobante.tipo_comprobante',
      ],
    });
  }
  async findByAdmin(
    findAllByAdminDto: FindByAdminDto,
  ): Promise<[Order[], number]> {
    const {
      page,
      pageSize,
      searchByCodeOrEmail,
      startDate,
      endDate,
      orderStatus,
      deliveryType,
    } = findAllByAdminDto;

    // unir datos y seleccionarlos
    // La diferencia entre LEFT JOINy INNER JOINes que INNER JOINno se devolverá un usuario si no tiene fotos. LEFT JOINSe devolverá el usuario incluso si no tiene fotos. Para obtener más información sobre los diferentes tipos de unión, consulte la documentación de SQL .
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.usuario', 'user')
      .leftJoinAndSelect('order.estado_pedido', 'estado_pedido')
      .leftJoinAndSelect('order.tipo_entrega', 'tipo_entrega')
      .leftJoinAndSelect('order.comprobante', 'comprobante')
      .leftJoinAndSelect('comprobante.tipo_comprobante', 'tipo_comprobante')
      .leftJoinAndSelect('order.detalles', 'detalles')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .orderBy('order.id', 'DESC');

    if (searchByCodeOrEmail) {
      query.andWhere(
        '(CAST(order.codigo AS TEXT) ILIKE :search OR user.correo ILIKE :search)',
        { search: `%${searchByCodeOrEmail.trim()}%` },
      );
    }

    if (startDate && endDate) {
      query.andWhere('order.fecha BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    } else if (startDate) {
      query.andWhere('order.fecha = :startDate', { startDate });
    } else if (endDate) {
      query.andWhere('order.fecha = :endDate', { endDate });
    }

    if (orderStatus) {
      query.andWhere('estado_pedido.id = :orderStatus', { orderStatus });
    }

    if (deliveryType) {
      query.andWhere('tipo_entrega.id = :deliveryType', { deliveryType });
    }

    return await query.getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  // https://docs.nestjs.com/techniques/database#typeorm-transactions
  // https://typeorm.io/docs/working-with-entity-manager/entity-manager-api
  // Con EntityManager EntityManager, puedes administrar (insertar, actualizar, eliminar, cargar, etc.) cualquier entidad.
  //  EntityManager es como una colección de todos los repositorios de entidades en un solo lugar.

  async updateStatus(updateOrderStatusDto: UpdateOrderStatusDto) {
    const { id_order_status, id_orders } = updateOrderStatusDto;
    const orderStatus = await this.orderStatusService.findOne(id_order_status);

    if (!orderStatus)
      throw new NotFoundException('El estado de pedido no existe');

    const result = await this.dataSource.transaction(async (manager) => {
      return await manager.update(Order, id_orders, {
        estado_pedido: orderStatus,
      });
    });

    return [`This action updates a ${result.affected} orders`];
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
