import { Module } from '@nestjs/common';
import { DeliveryTypeService } from './delivery-type.service';
import { DeliveryTypeController } from './delivery-type.controller';
import { DeliveryType } from './entities/delivery-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryType]), AuthModule],
  controllers: [DeliveryTypeController],
  providers: [DeliveryTypeService],
})
export class DeliveryTypeModule {}
