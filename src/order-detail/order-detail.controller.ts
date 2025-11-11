import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { FindByOrderDetailDto } from './dto/findByOrderDetail';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}



    @Post('findbyOrder/:orderId')
    async findByEntry(@Param('orderId') orderId: number,@Body() findByOrderDetailDto: FindByOrderDetailDto) {
      return await this.orderDetailService.findByOrder(+orderId,findByOrderDetailDto);
    }

  
}
