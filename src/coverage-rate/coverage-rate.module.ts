import { Module } from '@nestjs/common';
import { CoverageRateService } from './coverage-rate.service';
import { CoverageRateController } from './coverage-rate.controller';
import { CoverageRate } from './entities/coverage-rate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CoverageRate])],
  controllers: [CoverageRateController],
  providers: [CoverageRateService],
})
export class CoverageRateModule {}
