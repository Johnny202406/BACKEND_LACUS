import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constantes';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
