import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/MyUpdateProduct';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { Public, Role, Roles } from 'src/auth/guards/roles.decorator';
import { UpdateDiscount } from './dto/updateDiscount.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FindByAdminForEntryDto } from './dto/findByAdminForEntry.dto';
import { FindCatalogDto } from './dto/findCatalog.dto';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Post('findByAdminForEntry')
  async findByAdminForEntry(@Body() findByAdminForEntry:FindByAdminForEntryDto){
    return await this.productService.findByAdminForEntry(findByAdminForEntry)
  }
  @Public()
  @Get('findOneWithStock/:code')
  async findOneByAdminWithStock(@Param('code') code: string) {
    return await this.productService.findOneWithStock(code);
  }

  @Post('findByAdminWithStock')
  async findByAdminWithStock(@Body() findByAdminDto: FindByAdminDto) {
    return await this.productService.findByAdminWithStock(findByAdminDto);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Patch('enabledDisabled/:id')
  async enabledDisabled(
    @Param('id') id: string,
    @Body() enabledDisabled: EnabledDisabled,
  ) {
    return await this.productService.enabledDisabled(+id, enabledDisabled);
  }

  // este ya no
  @Public()
  @Post('catalog/:type')
  async catalog(@Param('type') type: string, @Body() findCatalogDto: FindCatalogDto) {
    return await this.productService.catalog(type,findCatalogDto);
  }

  @Public()
  @Get('newProducts')
  async newProducts(){
    return await this.productService.newProducts()
  }
  @Public()
  @Get('bestSellingProducts')
  async bestSellingProducts(){
    return await this.productService.bestSellingProducts()
  }
}
