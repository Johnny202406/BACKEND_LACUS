import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoverageRateService } from './coverage-rate.service';
import { CreateCoverageRateDto } from './dto/create-coverage-rate.dto';
import { UpdateCoverageRateDto } from './dto/update-coverage-rate.dto';

@Controller('coverage-rate')
export class CoverageRateController {
  constructor(private readonly coverageRateService: CoverageRateService) {}

  @Post()
  create(@Body() createCoverageRateDto: CreateCoverageRateDto) {
    return this.coverageRateService.create(createCoverageRateDto);
  }

  @Get()
  findAll() {
    return this.coverageRateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coverageRateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoverageRateDto: UpdateCoverageRateDto) {
    return this.coverageRateService.update(+id, updateCoverageRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coverageRateService.remove(+id);
  }
}
