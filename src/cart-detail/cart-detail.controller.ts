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
import { CartDetailService } from './cart-detail.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsClientGuard } from 'src/auth/guards/is-client.guard';

@Roles(Role.CLIENT)
@UseGuards(AuthGuard, IsClientGuard)
@Controller('cart-detail')
export class CartDetailController {
  constructor(private readonly cartDetailService: CartDetailService) {}

  @Post('create')
  async create(
    @Body() createCartDetailDto: CreateCartDetailDto,
  ) {
    return await  this.cartDetailService.create(createCartDetailDto);
  }

  @Get()
  findAll() {
    return this.cartDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartDetailService.findOne(+id);
  }

  @Patch('update')
  async update(
    @Body() updateCartDetailDto: UpdateCartDetailDto,
  ) {
    return await this.cartDetailService.update( updateCartDetailDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.cartDetailService.remove(+id);
  }
}
