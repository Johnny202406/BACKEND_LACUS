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
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginAndRegister')
  async loginAndRegister(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: AuthDto,
  ): Promise<User|undefined> {
    return await this.authService.loginAndRegister(response,authDto);
  }
  @UseGuards(AuthGuard)
  @Get('loadUser')
  async loadUser(@Req() request: Request): Promise<User> {
    return await this.authService.loadUser(request);
  }
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return await this.authService.logout(response);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
