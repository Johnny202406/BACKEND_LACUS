import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdatePublicationDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @MaxLength(500)
  @IsUrl()
  @IsNotEmpty()
  url_redireccion: string;
}
