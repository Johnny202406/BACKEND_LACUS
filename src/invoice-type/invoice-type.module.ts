import { Module } from '@nestjs/common';
import { InvoiceTypeService } from './invoice-type.service';
import { InvoiceTypeController } from './invoice-type.controller';
import { InvoiceType } from './entities/invoice-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceType])],
  controllers: [InvoiceTypeController],
  providers: [InvoiceTypeService],
})
export class InvoiceTypeModule {}
