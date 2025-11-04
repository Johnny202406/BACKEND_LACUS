import {
  IsBoolean,
  IsEnum,
  IsIn,
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
import { ColumnSortEnum, PageSizeEnum } from 'src/Enums';

export class FindCatalogDto {
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
  searchByBrandOrCategoryOrName: string;

  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @Min(0)
  @Max(1000)
  minValue: number;
  
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @Min(0)
  @IsPositive()
  @Max(1000)
  maxValue: number;

  @IsString()
  @IsOptional()
  @IsEnum(ColumnSortEnum)
  columnSort: string;

  @IsInt()
  @IsOptional()
  @IsIn([1, -1])
  valueSort: number;
}
