import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserMyDto } from './dto/update-user-my.dto';
import { IsClientGuard } from 'src/auth/guards/is-client.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Get('findAll')
  async findAll(@Param() findAllUserDto: FindAllUserDto) {
    return await this.userService.findAll(findAllUserDto);
  }

  @Roles(Role.CLIENT)
  @UseGuards(IsClientGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateMyUserDto: UpdateUserMyDto) {
    return this.userService.update(+id, updateMyUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Patch('enabledDisabled/:id')
  enabledDisable(@Param('id') id: string, @Body() enabledDisabled: EnabledDisabled) {
    return this.userService.enabledDisabled(+id, enabledDisabled);
  }

  
}
