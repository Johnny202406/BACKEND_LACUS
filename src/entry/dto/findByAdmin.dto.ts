import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  IsDate,
  IsPositive,
  IsEnum,
  MaxLength,
  IsBoolean,
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

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
