import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;
}
