import { Module } from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { EntryDetailController } from './entry-detail.controller';
import { EntryDetail } from './entities/entry-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([EntryDetail]), AuthModule],
  controllers: [EntryDetailController],
  providers: [EntryDetailService],
})
export class EntryDetailModule {}
