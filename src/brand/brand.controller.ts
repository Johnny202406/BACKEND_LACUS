import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Public, Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateBrandDto } from './dto/MyUpdateBrand.dto';
import { MyParseFilePipeBuilder, MyParseFilePipeBuilderOptional } from 'src/MyParseFilePipeBuilder';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('findAll')
  async findAll() {
    return await this.brandService.findAll();
  }

  @Public()
  @Get('findAllEnabled')
  async findAllEnabled() {
    return await this.brandService.findAllEnabled();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @UploadedFile(MyParseFilePipeBuilder)
    file: Express.Multer.File,
  ) {
    return await this.brandService.create(createBrandDto, file);
  }

  @Post('findByAdmin')
  async findByAdmin(@Body() findByAdminDto: FindByAdminDto) {
    return await this.brandService.findByAdmin(findByAdminDto);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @UploadedFile(MyParseFilePipeBuilderOptional)
    file?: Express.Multer.File,
  ) {
    return this.brandService.update(+id, updateBrandDto, file);
  }

  @Patch('enabledDisabled/:id')
  async enabledDisabled(@Param('id') id: string, @Body() enabledDisabled: EnabledDisabled) {
    return await this.brandService.enabledDisabled(+id, enabledDisabled);
  }
}
