import { Test, TestingModule } from '@nestjs/testing';
import { CoverageRateController } from './coverage-rate.controller';
import { CoverageRateService } from './coverage-rate.service';

describe('CoverageRateController', () => {
  let controller: CoverageRateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverageRateController],
      providers: [CoverageRateService],
    }).compile();

    controller = module.get<CoverageRateController>(CoverageRateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
