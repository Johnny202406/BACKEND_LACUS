import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayload } from 'google-auth-library';
import { UpdateUserMyDto } from './dto/update-user-my.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  async create(tokenPayload: TokenPayload): Promise<User> {
    const user: User = this.userRepository.create({
      sub: tokenPayload.sub,
      nombre: tokenPayload.given_name?.toUpperCase(),
      apellido: tokenPayload.family_name?.toUpperCase(),
      correo: tokenPayload.email?.toLowerCase(),
    });

    return await this.userRepository.save(user);
  }

  async enableDisable(id: string, value: boolean) {
    const user = (await this.findOneById(+id)) as User;
    user.habilitado = value;
    return await this.userRepository.save(user);
  }

  async findAll(findAllUserDto: FindAllUserDto): Promise<[User[], number]> {
    const { page, pageSize, searchByEmail, enabled } = findAllUserDto;
    const where: any = {
      ...(searchByEmail && { correo: Like(`%${searchByEmail}%`) }),
      ...(enabled !== undefined && { habilitado: enabled }),
    };
    // El operador cortocircuito (&&) devuelve el primer operando falso,
    // o el último operando verdadero si todos los operandos son verdaderos.
    // no puedes desestructurar con el spread operator (...) un boolean x ejemplo
    // explicación ya que me puedo olvidar jjsjs
    return await this.userRepository.findAndCount({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ['id_tipo_usuario'],
    });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['id_tipo_usuario'],
    });
  }

  async findOne(sub: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { sub },
      relations: ['id_tipo_usuario'],
    });
  }

  update(id: string, updateUserDto: UpdateUserMyDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
