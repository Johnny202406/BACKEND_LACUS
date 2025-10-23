import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EntryDetailService } from './entry-detail.service';
import { CreateEntryDetailDto } from './dto/create-entry-detail.dto';
import { UpdateEntryDetailDto } from './dto/update-entry-detail.dto';
import { FindByEntryDetailDto } from './dto/findByEntryDetail.dto';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('entry-detail')
export class EntryDetailController {
  constructor(private readonly entryDetailService: EntryDetailService) {}

  @Get('findbyEntry')
  async findByEntry(@Query() findByEntryDetailDto: FindByEntryDetailDto) {
    return await this.entryDetailService.findByEntry(findByEntryDetailDto);
  }
}
