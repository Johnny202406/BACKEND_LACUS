import { Module } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-type.service';
import { InvoiceTypeController } from './invoice-type.controller';

@Module({
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService],
})
export class InvoiceTypeModule {}
