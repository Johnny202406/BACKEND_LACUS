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
import { FindAllByUserDto } from './dto/findAllByUser.dto';
import { Order } from './entities/order.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsClientGuard } from 'src/auth/guards/is-client.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

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
  @Get('byClient/:id')
  async findAllByUser(
    @Param() id: string,
    @Query() findAllByUserDto: FindAllByUserDto,
  ): Promise<[Order[], number]> {
    return await this.orderService.findAllByUser(+id, findAllByUserDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Get('byAdmin')
  async findAllByAdmin(
    @Param() id: string,
    @Query() findAllByUserDto: FindAllByUserDto,
  ): Promise<[Order[], number]> {
    return await this.orderService.findAllByUser(+id, findAllByUserDto);
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
