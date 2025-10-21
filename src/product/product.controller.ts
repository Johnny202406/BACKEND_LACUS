import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/MyUpdateProduct';
import { FindByAdminDto } from './dto/findByAdmin.dto';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('findByAdminWithStock')
  async findByAdminWithStock(@Body() findByAdminDto: FindByAdminDto) {
    return await this.productService.findByAdminWithStock(findByAdminDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':sub')
  async findOneByCode(@Param('code') code: string) {
    return await this.productService.findOneByCode(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.productService.remove(+id);
  }
}
