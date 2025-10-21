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


@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Get('findAll')
  async findAll(@Param() findAllUserDto: FindAllUserDto) {
    return await this.userService.findAll(findAllUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Roles(Role.CLIENT)
  @UseGuards(IsClientGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserMyDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(IsAdminGuard)
  @Patch('disable/:id')
  enableDisable(@Param('id') id: string, @Body() value: boolean) {
    return this.userService.enableDisable(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
