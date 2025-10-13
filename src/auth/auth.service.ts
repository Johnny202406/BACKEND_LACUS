import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { oAuth2Client } from './google-auth';
import { ConfigService } from '@nestjs/config';
import { LoginTicket, TokenPayload } from 'google-auth-library';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import type { Response, Request } from 'express';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginAndRegister(
    response: Response,
    authDto: AuthDto,
  ): Promise<User | undefined> {
    const tokenPayload: TokenPayload = await this.getTokenPayload(authDto);
    let user = await this.userService.findOne(tokenPayload.sub);
    if (user && user.habilitado) {
      response.status(HttpStatus.OK);
    } else if (user && !user.habilitado) {
      response.status(HttpStatus.FORBIDDEN);
      return;
    } else {
      await this.userService.create(tokenPayload);
      user = await this.userService.findOne(tokenPayload.sub) as User;
      response.status(HttpStatus.ACCEPTED);
    }

    await this.setAuthCookie(response, user);
    return user;
  }
  async getTokenPayload(authDto: AuthDto): Promise<TokenPayload> {
    const loginTicket: LoginTicket = await oAuth2Client.verifyIdToken({
      idToken: authDto.credential,
      audience: this.configService.get<string>('WEB_CLIENT_ID'),
    });
    return loginTicket.getPayload() as TokenPayload;
  }

  async setAuthCookie(response: Response, user: User) {
    const minutes = user?.id_tipo_usuario.id === 1 ? 90 : 30;
    const plainUser = instanceToPlain(user);
    const jwt = await this.jwtService.signAsync(plainUser, {
      expiresIn: minutes * 60,
    });
    response.cookie('auth', jwt, {
      httpOnly: true,
      maxAge: minutes * 60 * 1000,
      signed: true,
      secure: false, // en producción cambiar a true
      priority: 'high',
      sameSite: 'lax',
      // partitioned: true,
    });
    return;
  }
  async loadUser(request: Request): Promise<User> {
    const cookie = request.signedCookies['auth'];
    const jwtdecoded = await this.jwtService.verifyAsync(cookie);
    const user = await this.userService.findOne(jwtdecoded.sub) as User;
    return user;
  }
  async logout(response: Response) {
    response.clearCookie('auth');
    response.status(HttpStatus.OK);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
