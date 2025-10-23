import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUserMyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  dni: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(9)
  numero: string;
}
