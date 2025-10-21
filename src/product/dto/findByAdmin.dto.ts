import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { PageSizeEnum } from 'src/Enums';

export class FindByAdminDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsEnum(PageSizeEnum)
  pageSize: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  searchByCodeOrName: string;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;

  @IsBoolean()
  @IsOptional()
  discount: boolean;

  @IsInt()
  @IsPositive()
  @IsOptional()
  id_category: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  id_brand: number;
}
