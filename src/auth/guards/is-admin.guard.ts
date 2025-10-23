import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Public, Role } from './roles.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
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
