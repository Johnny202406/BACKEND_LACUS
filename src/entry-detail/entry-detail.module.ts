import { Module } from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { EntryDetailController } from './entry-detail.controller';

@Module({
  controllers: [EntryDetailController],
  providers: [EntryDetailService],
})
export class EntryDetailModule {}
