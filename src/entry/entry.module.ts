import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), ProductModule, AuthModule],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
