import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeUserDto } from './create-type-user.dto';

export class UpdateTypeUserDto extends PartialType(CreateTypeUserDto) {}
