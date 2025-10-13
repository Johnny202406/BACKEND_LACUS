import {
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class FindAllByUserDto {
  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  pageSize: number;

  @IsString()
  @IsOptional()
  search: string;

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
