import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDetailDto } from './create-cart-detail.dto';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateCartDetailDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
