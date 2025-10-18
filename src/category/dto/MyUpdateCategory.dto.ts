import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;
}
