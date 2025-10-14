import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindAllByUserDto } from './dto/findAllByUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Order } from './entities/order.entity';
import { FindAllByAdminDto } from './dto/findAllByAdmin.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) { }
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  async findAllByUser(
    id: number,
    findAllByUserDto: FindAllByUserDto,
  ): Promise<[Order[], number]> {
    const {
      page,
      pageSize,
      searchByCode,
      startDate,
      endDate,
      orderStatus,
      deliveryType,
      paymentMethod,
    } = findAllByUserDto;
    const where: any = {
      id_usuario: id
      ...(searchByCode && { correo: Like(`%${searchByCode.trim()}%`) }),
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
    });
  }
  async findAllByAdmin(findAllByAdminDto: FindAllByAdminDto): Promise<[Order[], number]> {
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

    const query = this.orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.usuario', 'usuario')  // ajusta la relación según tu modelo
      .take(pageSize)
      .skip((page - 1) * pageSize);

    if (searchByCodeOrEmail) {
      query.andWhere(
        '(order.codigo LIKE :search OR usuario.correo LIKE :search)',
        { search: `%${searchByCodeOrEmail.trim()}%` }
      );
    }

    if (startDate && endDate) {
      query.andWhere('order.fecha BETWEEN :startDate AND :endDate', { startDate, endDate });
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
      query.andWhere('order.id_metodo_pago = :paymentMethod', { paymentMethod });
    }
    return await query.getManyAndCount();

    
  }




  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
