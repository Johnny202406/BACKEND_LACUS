import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartDetailDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id_carrito: number;
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id_producto: number;
}
