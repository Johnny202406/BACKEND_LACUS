import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type {Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
import { Public } from './roles.decorator';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService,
    private userService: UserService,
    private reflector: Reflector
  ){}
  async canActivate(
    context: ExecutionContext,
  ):   Promise<boolean>{
    const isPublic = this.reflector.get(Public, context.getHandler());
    if (isPublic) return true
    const request = context.switchToHttp().getRequest() as Request;
    const cookie=request.signedCookies['auth']
    if(!cookie) return false;
    const user = await this.jwtService.verifyAsync(cookie);
    if (!user) return false;
    const userDB = await this.userService.findOne(user.sub);
    if (!userDB) return false;
    if(!userDB?.habilitado) return false;
    request['user'] = userDB;
    return true;
  }
}

// los guards cuando no implementas tu propia excepcion devuelve status code forbidden=403
