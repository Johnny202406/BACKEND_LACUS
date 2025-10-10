import { Reflector } from '@nestjs/core';
enum Role {
    ADMIN = 'administrador',
    USER = 'cliente',
}

export const Roles = Reflector.createDecorator<Role>();
export const Public = Reflector.createDecorator<boolean>({key: 'isPublic'});