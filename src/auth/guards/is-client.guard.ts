import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Public, Role } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import type {Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class IsClientGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   const isPublic = this.reflector.get(Public, context.getHandler());
       if (isPublic) return true;
       // busca metadata  primero en el metodo y luego en la clase
       const role = this.reflector.getAllAndOverride<Role>('Role', [
         context.getHandler(),
         context.getClass(),
       ]);
    const request = context.switchToHttp().getRequest() as Request;
    const userDB = request['user'] as User;

    if (role !== userDB.tipo_usuario.nombre) return false;

    return true;
  }
}
