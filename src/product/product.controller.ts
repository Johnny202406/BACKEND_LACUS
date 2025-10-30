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
  @Patch('updateDiscount/:id')
  async updateDiscount(
    @Param('id') id: string,
    @Body() updateDiscount: UpdateDiscount,
  ) {
    return await this.productService.updateDiscount(+id, updateDiscount);
  }
}
