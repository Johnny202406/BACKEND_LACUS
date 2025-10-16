import { Test, TestingModule } from '@nestjs/testing';
import { EntryDetailController } from './entry-detail.controller';
import { EntryDetailService } from './entry-detail.service';

describe('EntryDetailController', () => {
  let controller: EntryDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryDetailController],
      providers: [EntryDetailService],
    }).compile();

    controller = module.get<EntryDetailController>(EntryDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
