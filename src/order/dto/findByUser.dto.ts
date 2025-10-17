import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  IsDate,
  IsPositive,
} from 'class-validator';

export class FindByUserDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  pageSize: number;

  @IsString()
  @IsOptional()
  searchByCode: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsInt()
  @IsOptional()
  orderStatus: number;

  @IsInt()
  @IsOptional()
  deliveryType: number;

  @IsInt()
  @IsOptional()
  paymentMethod: number;
}
