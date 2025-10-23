import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('create')
  async create(@Body() createEntryDto: CreateEntryDto) {
    return await this.entryService.create(createEntryDto);
  }

  @Get('findByAdmin')
  async findByAdmin(@Body() findByAdmin: FindByAdminDto) {
    return await this.entryService.findByAdmin(findByAdmin);
  }

  @Patch('disabled/:id')
  async disabled(@Param('id') id: string) {
    return await this.entryService.disabled(+id);
  }
}
