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
  StreamableFile,
  Res,
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
import { PedidoDTO } from './dto/create-order.dto copy';
import type { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller('order')
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() pedidoDTO: PedidoDTO) {
    return await this.orderService.create(pedidoDTO);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  


 @Get('download/pdf/:id')
async downloadPDF(@Param('id') id: string, @Res() res: Response) {
  const { codigo, pdf } = await this.orderService.generatePDF(+id); // pdf = Buffer

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${codigo}.pdf"`,
    'Content-Length': pdf.length,
  });

  res.end(pdf); // Esto fuerza la descarga
}






  @Roles(Role.CLIENT)
  @UseGuards(IsClientGuard)
  @Post('findByClient/:id')
  async findByClient(
    @Param('id') id: string,
    @Body() findByClientDto: FindByClientDto,
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
