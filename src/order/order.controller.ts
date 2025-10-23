import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindByClientDto } from './dto/findByClient.dto';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsClientGuard } from 'src/auth/guards/is-client.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(Role.CLIENT)
  @UseGuards(IsClientGuard)
  @Get('findByClient/:id')
  async findByClient(
    @Param() id: string,
    @Query() findByClientDto: FindByClientDto,
  ): Promise<[Order[], number]> {
    return await this.orderService.findByClient(+id, findByClientDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Get('findByAdmin')
  async findByAdmin(
    @Query() findByAdminDto: FindByAdminDto,
  ): Promise<[Order[], number]> {
    return await this.orderService.findByAdmin(findByAdminDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
