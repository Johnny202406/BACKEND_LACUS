import { Module } from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { EntryDetailController } from './entry-detail.controller';
import { EntryDetail } from './entities/entry-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntryDetail])],
  controllers: [EntryDetailController],
  providers: [EntryDetailService],
})
export class EntryDetailModule {}
