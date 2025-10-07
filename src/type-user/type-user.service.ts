import { Injectable } from '@nestjs/common';
import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';
import { TypeUser } from './entities/type-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUser)
    private typeUserRepository: Repository<TypeUser>,
  ) {}
  create(createTypeUserDto: CreateTypeUserDto) {
    return 'This action adds a new typeUser';
  }

  findAll() {
    return this.typeUserRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} typeUser`;
  }

  update(id: number, updateTypeUserDto: UpdateTypeUserDto) {
    return `This action updates a #${id} typeUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeUser`;
  }
}
