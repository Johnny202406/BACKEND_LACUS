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
  searchByCodeOrEmail: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsInt()
  @IsOptional()
  orderStatus: number;

  @IsInt()
  @IsOptional()
  deliveryType: number;
}
