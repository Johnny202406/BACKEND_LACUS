import { Module } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { UserTypeController } from './user-type.controller';
import { UserType } from './entities/user-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
})
export class UserTypeModule {}
