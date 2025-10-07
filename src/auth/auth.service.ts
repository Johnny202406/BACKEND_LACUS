import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { oAuth2Client } from './google-auth';
import { ConfigService } from '@nestjs/config';
import { LoginTicket, TokenPayload } from 'google-auth-library';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { response } from 'express';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async getTokenPayload(authDto:AuthDto):Promise<TokenPayload>{
    const loginTicket:LoginTicket =await oAuth2Client.verifyIdToken({
      idToken: authDto.credential,
      audience: this.configService.get<string>('WEB_CLIENT_ID')??authDto.client_id,
    });
    return loginTicket.getPayload() as TokenPayload
  }
  async loginAndRegister(authDto: AuthDto) {
    const tokenPayload:TokenPayload=await this.getTokenPayload(authDto)
    return await this.userService.findOne(tokenPayload.sub)

  }

  async signIn(user:User){
    const jwt=await this.jwtService.signAsync(user)
    return response.status(200).cookie('auth',jwt).send(user)
  }
  async SignUp({authDto,userDataRegister}:RegisterDto){
    const tokenPayload:TokenPayload=await this.getTokenPayload(authDto)
    const user=await this.userService.create({tokenPayload,userDataRegister})
    return this.signIn(user)
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
