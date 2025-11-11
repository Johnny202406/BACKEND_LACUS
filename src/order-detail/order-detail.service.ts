import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { FindByOrderDetailDto } from './dto/findByOrderDetail';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}
  async findByOrder(
    orderId: number,
    findByOrderDetailDto: FindByOrderDetailDto,
  ) {
    const { page, pageSize } = findByOrderDetailDto;
    return await this.orderDetailRepository.findAndCount({
      where: { pedido: { id: orderId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
      relations: ['producto'],
    });
  }
}
