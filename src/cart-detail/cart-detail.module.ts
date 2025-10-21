import { Module } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CartDetailController } from './cart-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartDetail])],
  controllers: [CartDetailController],
  providers: [CartDetailService],
})
export class CartDetailModule {}
