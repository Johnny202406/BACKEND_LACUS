import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateEntryDetailDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  amount: number;
}
