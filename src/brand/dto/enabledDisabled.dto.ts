import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EnabledDisabled {
  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
