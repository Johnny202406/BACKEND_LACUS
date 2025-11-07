import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart]),AuthModule,ProductModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
