import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
import type { Response,Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './guards/roles.decorator';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('loginAndRegister')
  async loginAndRegister(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: AuthDto,
  ): Promise<User|undefined> {
    return await this.authService.loginAndRegister(response,authDto);
  }

  @Get('loadUser')
  async loadUser(@Req() request: Request): Promise<User> {
    return await this.authService.loadUser(request);
  }
  @Public()
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return await this.authService.logout(response);
  }

}
