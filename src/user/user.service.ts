import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayload } from 'google-auth-library';
import { UpdateUserMyDto } from './dto/update-user-my.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';

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

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['tipo_usuario'],
    });
  }

  async findOneBySub(sub: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { sub },
      relations: ['tipo_usuario'],
    });
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
      relations: ['tipo_usuario'],
    });
  }

  async update(id: number, updateUserMyDto: UpdateUserMyDto) {
    const user = await this.userRepository.findOneByOrFail({
      id,
    });

    user.nombre = updateUserMyDto.nombre.trim().toUpperCase();
    user.apellido = updateUserMyDto.apellido.trim().toUpperCase();
    user.dni = updateUserMyDto.dni.trim().toUpperCase();
    user.numero = updateUserMyDto.numero.trim().toUpperCase();

    await this.userRepository.save(user);

    return `This action updates a #${id} user`;
  }
  
  async enabledDisabled(id: number, enabledDisabled: EnabledDisabled) {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.habilitado = enabledDisabled.enabled;
    return await this.userRepository.save(user);
  }
}
