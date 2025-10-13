import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './roles.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
    ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get(Role, context.getHandler());
    const request = context.switchToHttp().getRequest() as Request;
    const userDB = request['user'] as User;
    if (role !== userDB.id_tipo_usuario.nombre) return false;
    return true;
  }
}
