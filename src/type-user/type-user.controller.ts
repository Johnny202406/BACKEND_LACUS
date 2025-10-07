import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';

@Controller('type-user')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @Post()
  create(@Body() createTypeUserDto: CreateTypeUserDto) {
    return this.typeUserService.create(createTypeUserDto);
  }

  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeUserDto: UpdateTypeUserDto) {
    return this.typeUserService.update(+id, updateTypeUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeUserService.remove(+id);
  }
}
