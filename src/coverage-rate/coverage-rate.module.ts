import { Module } from '@nestjs/common';
import { CoverageRateService } from './coverage-rate.service';
import { CoverageRateController } from './coverage-rate.controller';

@Module({
  controllers: [CoverageRateController],
  providers: [CoverageRateService],
})
export class CoverageRateModule {}
