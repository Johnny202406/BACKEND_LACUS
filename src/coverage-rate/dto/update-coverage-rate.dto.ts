import { PartialType } from '@nestjs/mapped-types';
import { CreateCoverageRateDto } from './create-coverage-rate.dto';

export class UpdateCoverageRateDto extends PartialType(CreateCoverageRateDto) {}
