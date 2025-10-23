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
} from '@nestjs/common';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('files'))
  create(
    @Param('product_id') product_id: string,
    @UploadedFile(MyParseFilePipeBuilder) files: Express.Multer.File[],
  ) {
    return this.productImageService.create(+product_id, files);
  }

  @Get('findByProduct/:id')
  async findByProduct(@Param('id') id: string) {
    return await this.productImageService.findByProduct(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile(MyParseFilePipeBuilder) file: Express.Multer.File,
  ) {
    return this.productImageService.update(+id, file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productImageService.remove(+id);
  }
}
