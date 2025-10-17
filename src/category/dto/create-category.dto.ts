import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;
}
