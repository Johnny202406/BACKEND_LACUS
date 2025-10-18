import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { MyParseFilePipeBuilder } from 'src/MyParseFilePipeBuilder';
import { UpdateCategoryDto } from './dto/MyUpdateCategory.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { Public, Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('findAll')
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Public()
  @Get('findAllEnabled')
  async findAllEnabled() {
    return await this.categoryService.findAllEnabled();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(MyParseFilePipeBuilder)
    file: Express.Multer.File,
  ) {
    return await this.categoryService.create(createCategoryDto, file);
  }

  @Get('findByAdmin')
  async findByAdmin(@Body() findByAdminDto: FindByAdminDto) {
    return await this.categoryService.findByAdmin(findByAdminDto);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(MyParseFilePipeBuilder)
    file?: Express.Multer.File,
  ) {
    return this.categoryService.update(+id, updateCategoryDto, file);
  }

  @Patch('enabledDisabled/:id')
  async enabledDisabled(@Param('id') id: string, @Body() enabled: boolean) {
    return await this.categoryService.enabledDisabled(+id, enabled);
  }
}
