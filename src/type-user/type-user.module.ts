import { Module } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { TypeUserController } from './type-user.controller';
import { TypeUser } from './entities/type-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUser])],
  controllers: [TypeUserController],
  providers: [TypeUserService],
})
export class TypeUserModule {}
