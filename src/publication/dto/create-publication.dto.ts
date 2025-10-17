import { IsNotEmpty, IsString, isURL, IsUrl, MaxLength, MinLength,  } from "class-validator"

export class CreatePublicationDto {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    titulo:string

    @IsString()
    @MaxLength(500)
    @IsUrl()
    @IsNotEmpty()
    url_redireccion:string

}
