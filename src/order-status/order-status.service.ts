import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './entities/order-status.entity';
import { Order } from 'src/order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {
   constructor(
      @InjectRepository(OrderStatus)
      private orderStatusRepository: Repository<OrderStatus>,
    ) {}
  create(createOrderStatusDto: CreateOrderStatusDto) {
    return 'This action adds a new orderStatus';
  }

  async findOne(id: number) {
    return await this.orderStatusRepository.findOneBy({ id });
  }


  async findAll() {
    return await this.orderStatusRepository.find();
  }


  update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return `This action updates a #${id} orderStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
