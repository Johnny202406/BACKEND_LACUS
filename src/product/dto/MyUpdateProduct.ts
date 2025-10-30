import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @IsPositive()
  weight_kg: number;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(100)
  discount: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id_category: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id_brand: number;
}
