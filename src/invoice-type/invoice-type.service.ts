import { Injectable } from '@nestjs/common';
import { CreateInvoiceTypeDto } from './dto/create-invoice-type.dto';
import { UpdateInvoiceTypeDto } from './dto/update-invoice-type.dto';

@Injectable()
export class InvoiceTypeService {
  create(createInvoiceTypeDto: CreateInvoiceTypeDto) {
    return 'This action adds a new invoiceType';
  }

  findAll() {
    return `This action returns all invoiceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceType`;
  }

  update(id: number, updateInvoiceTypeDto: UpdateInvoiceTypeDto) {
    return `This action updates a #${id} invoiceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceType`;
  }
}
