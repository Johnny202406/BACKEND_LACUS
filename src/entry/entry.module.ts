import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
