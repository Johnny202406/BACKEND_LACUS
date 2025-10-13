import { Reflector } from '@nestjs/core';
export enum Role {
  ADMIN = 'administrador',
  CLIENT = 'cliente',
}

export const Roles = Reflector.createDecorator<Role>({ key: 'Role' });
export const Public = Reflector.createDecorator<boolean>({ key: 'isPublic' });
