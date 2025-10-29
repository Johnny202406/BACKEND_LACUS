import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Public, Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MyParseFilePipeBuilder, MyParseFilePipeBuilderOptional } from 'src/MyParseFilePipeBuilder';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { UpdatePublicationDto } from './dto/MyUpdatePublication.dto';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Public()
  @Get('findAll')
  async findAll() {
    return await this.publicationService.findAll();
  }

  // https://docs.nestjs.com/techniques/file-upload
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UploadedFile(MyParseFilePipeBuilder)
    file: Express.Multer.File,
  ) {
    return await this.publicationService.create(createPublicationDto, file);
  }

  @Post('findByAdmin')
  async findByAdmin(@Body() findByAdminDto: FindByAdminDto) {
    return await this.publicationService.findByAdmin(findByAdminDto);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @UploadedFile(MyParseFilePipeBuilderOptional)
    file?: Express.Multer.File,
  ) {
    return await this.publicationService.update(+id, updatePublicationDto, file);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.publicationService.remove(+id);
  }
}
