import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginAndRegister')
  async loginAndRegister(@Res() res: express.Response,@Body() authDto: AuthDto) {
    const user= await this.authService.loginAndRegister(authDto);
    if (user) {
        return res.status(200).send(user);
    }
        
     return res.status(202)
  }
  @Post('register')
  async register(@Body() RegisterDto:RegisterDto){
    return await this.authService.SignUp(RegisterDto)
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
