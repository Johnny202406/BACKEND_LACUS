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

export class FindByEntryDetailDto {

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  entryId: number;
  
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsEnum(PageSizeEnum)
  pageSize: number;

}
