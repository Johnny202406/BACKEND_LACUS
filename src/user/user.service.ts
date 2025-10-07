import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  async create({tokenPayload,userDataRegister}:CreateUserDto):Promise<User>{
    const user:User = this.userRepository.create(<User>{
      sub:tokenPayload.sub,
      nombre:tokenPayload.given_name?.toUpperCase(),
      apellido:tokenPayload.family_name?.toUpperCase(),
      correo:tokenPayload.email,
      dni:userDataRegister.dni,
      numero:userDataRegister.numero,
    });

    return await this.userRepository.save(user)
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(sub: string) {
    return await this.userRepository.findOneBy({sub})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
