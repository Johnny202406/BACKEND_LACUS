import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindByUserDto } from './dto/findByUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  ILike,
  MoreThanOrEqual,
  Repository,
  DataSource,
} from 'typeorm';
import { Order } from './entities/order.entity';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { User } from 'src/user/entities/user.entity';

import { OrderStatusService } from 'src/order-status/order-status.service';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderStatusService: OrderStatusService,
    private dataSource: DataSource
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  async findByUser(
    id: number,
    findAllByUserDto: FindByUserDto,
  ): Promise<[Order[], number]> {
    const {
      page,
      pageSize,
      searchByCode = undefined,
      startDate = undefined,
      endDate = undefined,
      orderStatus = undefined,
      deliveryType = undefined,
      paymentMethod = undefined,
    } = findAllByUserDto;
    const where: any = {
      id_usuario: id,
      ...(searchByCode && { correo: ILike(`%${searchByCode.trim()}%`) }),
      ...(startDate && endDate
        ? { fecha: Between(startDate, endDate) }
        : startDate
          ? { fecha: MoreThanOrEqual(startDate) }
          : endDate
            ? { fecha: LessThanOrEqual(endDate) }
            : undefined),
      ...(orderStatus && { id_estado_pedido: orderStatus }),
      ...(deliveryType && { id_tipo_entrega: deliveryType }),
      ...(paymentMethod && { id_metodo_pago: paymentMethod }),
    };
    return await this.orderRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
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
      paymentMethod,
    } = findAllByAdminDto;

    // unir datos y seleccionarlos
    // La diferencia entre LEFT JOINy INNER JOINes que INNER JOINno se devolverá un usuario si no tiene fotos. LEFT JOINSe devolverá el usuario incluso si no tiene fotos. Para obtener más información sobre los diferentes tipos de unión, consulte la documentación de SQL .
    const query = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect(User, 'user', 'user.id = order.id_usuario')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .orderBy('order.id', 'DESC');

    if (searchByCodeOrEmail) {
      query.andWhere(
        '(order.codigo ILIKE :search OR user.correo ILIKE :search)',
        { search: `%${searchByCodeOrEmail.trim()}%` },
      );
    }

    if (startDate && endDate) {
      query.andWhere('order.fecha BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    } else if (startDate) {
      query.andWhere('order.fecha >= :startDate', { startDate });
    } else if (endDate) {
      query.andWhere('order.fecha <= :endDate', { endDate });
    }

    if (orderStatus) {
      query.andWhere('order.id_estado_pedido = :orderStatus', { orderStatus });
    }

    if (deliveryType) {
      query.andWhere('order.id_tipo_entrega = :deliveryType', { deliveryType });
    }

    if (paymentMethod) {
      query.andWhere('order.id_metodo_pago = :paymentMethod', {
        paymentMethod,
      });
    }
    return await query.printSql().getManyAndCount();
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

    const result=await this.dataSource.transaction(async manager => {
      return await manager.update(Order, id_orders, { estado_pedido: orderStatus });
  });

    return `This action updates a ${result.affected} orders`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
