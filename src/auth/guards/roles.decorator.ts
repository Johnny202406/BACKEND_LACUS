import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export enum Role {
  ADMIN = 'administrador',
  CLIENT = 'cliente',
}


export const Roles = (rol: Role) => SetMetadata('Role', rol);
export const Public = Reflector.createDecorator<boolean>({ key: 'isPublic' });
