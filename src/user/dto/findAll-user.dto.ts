
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindAllUserDto {
  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  pageSize: number;

  @IsString()
  @IsOptional()
  searchByEmail: string;

  @IsBoolean()
  @IsOptional()
  enabled: string;
}
