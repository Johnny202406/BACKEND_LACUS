import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderStatusModule } from 'src/order-status/order-status.module';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderStatusModule, AuthModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
