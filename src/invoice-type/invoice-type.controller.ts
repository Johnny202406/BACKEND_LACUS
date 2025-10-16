import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-type.service';
import { CreateInvoiceTypeDto } from './dto/create-invoice-type.dto';
import { UpdateInvoiceTypeDto } from './dto/update-invoice-type.dto';

@Controller('invoice-type')
export class InvoiceTypeController {
  constructor(private readonly invoiceTypeService: InvoiceTypeService) {}

  @Post()
  create(@Body() createInvoiceTypeDto: CreateInvoiceTypeDto) {
    return this.invoiceTypeService.create(createInvoiceTypeDto);
  }

  @Get()
  findAll() {
    return this.invoiceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceTypeDto: UpdateInvoiceTypeDto) {
    return this.invoiceTypeService.update(+id, updateInvoiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceTypeService.remove(+id);
  }
}
