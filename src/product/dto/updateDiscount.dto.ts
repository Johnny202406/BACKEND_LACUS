import { IsInt, IsNotEmpty, IsPositive, Max, Min } from 'class-validator';

export class UpdateDiscount {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  @Max(100)
  discount: number;
}
