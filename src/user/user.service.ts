import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
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

  async create(tokenPayload: TokenPayload): Promise<User> {
    const user: User = this.userRepository.create({
      sub: tokenPayload.sub,
      nombre: tokenPayload.given_name?.toUpperCase(),
      apellido: tokenPayload.family_name?.toUpperCase(),
      correo: tokenPayload.email?.toLowerCase(),
    });

    return await this.userRepository.save(user);
  }

  async enableDisable(id: number, value: boolean) {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.habilitado = value;
    return await this.userRepository.save(user);
  }

  async findAll(findAllUserDto: FindAllUserDto): Promise<[User[], number]> {
    const { page, pageSize, searchByEmail, enabled } = findAllUserDto;
    const where: any = {
      ...(searchByEmail && { correo: ILike(`%${searchByEmail}%`) }),
      ...(enabled !== undefined && { habilitado: enabled }),
    };
    // El operador cortocircuito (&&) devuelve el primer operando falso,
    // o el último operando verdadero si todos los operandos son verdaderos.
    // no puedes desestructurar con el spread operator (...) un boolean x ejemplo
    // explicación ya que me puedo olvidar jjsjs
    return await this.userRepository.findAndCount({
      where: where,
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

  async findOneBySub(sub: string): Promise<User | null> {
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
