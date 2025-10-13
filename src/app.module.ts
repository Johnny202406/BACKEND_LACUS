import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TypeUserModule } from './type-user/type-user.module';
import { ConfigModule } from '@nestjs/config';
import { EstadoPedidoModule } from './estado-pedido/estado-pedido.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { DeliveryTypeModule } from './delivery-type/delivery-type.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'lacus',
      autoLoadEntities: true,
      entities: [],
      synchronize: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    UserModule,
    TypeUserModule,
    EstadoPedidoModule,
    OrderStatusModule,
    DeliveryTypeModule,
    PaymentMethodModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
