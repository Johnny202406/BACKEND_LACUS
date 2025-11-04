import { Injectable } from '@nestjs/common';
import { CreateEntryDetailDto } from './dto/create-entry-detail.dto';
import { UpdateEntryDetailDto } from './dto/update-entry-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntryDetail } from './entities/entry-detail.entity';
import { Repository } from 'typeorm';
import { FindByEntryDetailDto } from './dto/findByEntryDetail.dto';

@Injectable()
export class EntryDetailService {
  constructor(
    @InjectRepository(EntryDetail)
    private entryDetailRepository: Repository<EntryDetail>,
  ) {}

  async findByEntry(
    entryId: number,
    findByEntryDetailDto: FindByEntryDetailDto,
  ) {
    const { page, pageSize } = findByEntryDetailDto;
    return await this.entryDetailRepository.findAndCount({
      where: { entrada: { id: entryId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
      relations:['producto']
    });
  }
}
