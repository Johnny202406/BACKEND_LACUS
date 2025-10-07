import { IsString } from 'class-validator';
export class AuthDto {
  @IsString()
  clientId: string;
  
  @IsString()
  client_id: string;

  @IsString()
  credential: string;

  @IsString()
  select_by: string;
}
