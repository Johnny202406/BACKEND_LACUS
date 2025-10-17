import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
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
  @MinLength(1)
  @MaxLength(100)
  searchByName: string;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
