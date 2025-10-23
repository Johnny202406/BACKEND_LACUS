import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateEntryDetailDto } from 'src/entry-detail/dto/create-entry-detail.dto';
CreateEntryDetailDto;

export class CreateEntryDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateEntryDetailDto)
  data: CreateEntryDetailDto[];
}
