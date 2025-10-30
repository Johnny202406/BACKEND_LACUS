import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserMyDto } from './dto/update-user-my.dto';
import { IsClientGuard } from 'src/auth/guards/is-client.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { EnabledDisabled } from './dto/enabledDisabled.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Post('findByAdmin')
  async findByAdmin(@Body() findByAdminDto: FindByAdminDto) {
    return await this.userService.findByAdmin(findByAdminDto);
  }

  @Roles(Role.CLIENT)
  @UseGuards(IsClientGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() updateMyUserDto: UpdateUserMyDto) {
    return await this.userService.update(+id, updateMyUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Patch('enabledDisabled/:id')
  async enabledDisable(@Param('id') id: string, @Body() enabledDisabled: EnabledDisabled) {
    return await this.userService.enabledDisabled(+id, enabledDisabled);
  }

  
}
