import { PartialType } from '@nestjs/mapped-types';
import { CreateEntryDetailDto } from './create-entry-detail.dto';

export class UpdateEntryDetailDto extends PartialType(CreateEntryDetailDto) {}
