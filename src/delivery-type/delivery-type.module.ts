import { Module } from '@nestjs/common';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeController } from './delivery-type.controller';
import { DeliveryType } from './entities/delivery-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryType])],
  controllers: [DeliveryTypeController],
  providers: [DeliveryTypeService],
})
export class DeliveryTypeModule {}
