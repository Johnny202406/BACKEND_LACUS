import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TypeUserModule } from './type-user/type-user.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
