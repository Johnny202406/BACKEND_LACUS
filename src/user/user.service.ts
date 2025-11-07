import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayload } from 'google-auth-library';
import { UpdateUserMyDto } from './dto/update-user-my.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(tokenPayload: TokenPayload): Promise<User> {
    const result = await this.dataSource.transaction(async (manager) => {
      const user: User = manager.create(User, {
        sub: tokenPayload.sub,
        nombre: tokenPayload.given_name?.toUpperCase(),
        apellido: tokenPayload.family_name?.toUpperCase(),
        correo: tokenPayload.email?.toLowerCase(),
        tipo_usuario: { id: 2 },
      });

      const savedUser = await manager.save(User, user);

      const cart: Cart = manager.create(Cart, {
        usuario: savedUser,
        updated_at: new Date(),
      });

      await manager.save(Cart, cart);
      return savedUser;
    });

    return result;
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

  async findByAdmin(findByAdminDto: FindByAdminDto): Promise<[User[], number]> {
    const {
      page,
      pageSize,
      searchByEmail = undefined,
      enabled = undefined,
    } = findByAdminDto;
    const where: any = {
      ...(searchByEmail && { correo: ILike(`%${searchByEmail}%`) }),
      ...(enabled !== undefined && { habilitado: enabled }),
    };
    // El operador cortocircuito (&&) devuelve el primer operando falso,
    // o el último operando verdadero si todos los operandos son verdaderos.
    // no puedes desestructurar con el spread operator (...) un boolean x ejemplo
    // explicación ya que me puedo olvidar jjsjs
    return await this.userRepository.findAndCount({
      where: {
        ...where,
        tipo_usuario: { id: 2 },
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
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

    return await this.userRepository.save(user);
  }

  async enabledDisabled(id: number, enabledDisabled: EnabledDisabled) {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.habilitado = enabledDisabled.enabled;
    await this.userRepository.save(user);
    return [`This action enables or disables a #${id} user`];
  }
}
