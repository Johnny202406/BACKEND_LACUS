import { Injectable } from '@nestjs/common';
import { CreateCoverageRateDto } from './dto/create-coverage-rate.dto';
import { UpdateCoverageRateDto } from './dto/update-coverage-rate.dto';

@Injectable()
export class CoverageRateService {
  create(createCoverageRateDto: CreateCoverageRateDto) {
    return 'This action adds a new coverageRate';
  }

  findAll() {
    return `This action returns all coverageRate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coverageRate`;
  }

  update(id: number, updateCoverageRateDto: UpdateCoverageRateDto) {
    return `This action updates a #${id} coverageRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} coverageRate`;
  }
}
