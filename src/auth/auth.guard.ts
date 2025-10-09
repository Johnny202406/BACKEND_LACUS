import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import type {Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService
  )
  {}
  async canActivate(
    context: ExecutionContext,
  ):   Promise<boolean>{
    const request = context.switchToHttp().getRequest() as Request;
    const cookie=request.signedCookies['auth']
    const user = await this.jwtService.verifyAsync(cookie);
    if (user) {
      
    }
    return true;
  }
}

