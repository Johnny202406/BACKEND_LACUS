import {
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  IsDate,
} from 'class-validator';

export class FindByAdminDto {
  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  pageSize: number;

  @IsString()
  @IsOptional()
  searchByCodeOrEmail: string;

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
