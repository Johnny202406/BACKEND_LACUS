import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MyParseFilePipeBuilder } from 'src/MyParseFilePipeBuilder';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('product-image')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post('create/:product_id')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Param('product_id') product_id: string,
    @UploadedFiles(MyParseFilePipeBuilder) files: Express.Multer.File[],
  ) {
    return await this.productImageService.create(+product_id, files);
  }

  @Get('findByProduct/:id')
  async findByProduct(@Param('id') id: string) {
    return await this.productImageService.findByProduct(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @UploadedFile(MyParseFilePipeBuilder) file: Express.Multer.File,
  ) {
    return await this.productImageService.update(+id, file);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.productImageService.remove(+id);
  }
}