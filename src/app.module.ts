import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderStatusModule } from './order-status/order-status.module';
import { DeliveryTypeModule } from './delivery-type/delivery-type.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { ProductImageModule } from './product-image/product-image.module';
import { PublicationModule } from './publication/publication.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { EntryDetailModule } from './entry-detail/entry-detail.module';
import { CartModule } from './cart/cart.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceTypeModule } from './invoice-type/invoice-type.module';
import { EntryModule } from './entry/entry.module';
import { UserTypeModule } from './user-type/user-type.module';
import { CoverageRateModule } from './coverage-rate/coverage-rate.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('TYPE'),
        host: configService.get<string>('HOSTNAME'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    UserModule,
    OrderStatusModule,
    DeliveryTypeModule,
    PaymentMethodModule,
    OrderModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    ProductImageModule,
    PublicationModule,
    OrderDetailModule,
    EntryDetailModule,
    CartModule,
    CartDetailModule,
    InvoiceModule,
    InvoiceTypeModule,
    EntryModule,
    UserTypeModule,
    CoverageRateModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
