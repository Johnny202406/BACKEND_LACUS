import { Test, TestingModule } from '@nestjs/testing';
import { CoverageRateService } from './coverage-rate.service';

describe('CoverageRateService', () => {
  let service: CoverageRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoverageRateService],
    }).compile();

    service = module.get<CoverageRateService>(CoverageRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
