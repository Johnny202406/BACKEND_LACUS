import { Test, TestingModule } from '@nestjs/testing';
import { EntryDetailService } from './entry-detail.service';

describe('EntryDetailService', () => {
  let service: EntryDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntryDetailService],
    }).compile();

    service = module.get<EntryDetailService>(EntryDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
