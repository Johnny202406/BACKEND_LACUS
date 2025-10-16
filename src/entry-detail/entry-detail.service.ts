import { Injectable } from '@nestjs/common';
import { CreateEntryDetailDto } from './dto/create-entry-detail.dto';
import { UpdateEntryDetailDto } from './dto/update-entry-detail.dto';

@Injectable()
export class EntryDetailService {
  create(createEntryDetailDto: CreateEntryDetailDto) {
    return 'This action adds a new entryDetail';
  }

  findAll() {
    return `This action returns all entryDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entryDetail`;
  }

  update(id: number, updateEntryDetailDto: UpdateEntryDetailDto) {
    return `This action updates a #${id} entryDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} entryDetail`;
  }
}
