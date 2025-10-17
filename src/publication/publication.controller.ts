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
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role, Roles } from 'src/auth/guards/roles.decorator';
import { IsAdminGuard } from 'src/auth/guards/is-admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import MyParseFilePipeBuilder from 'src/ParseFilePipeBuilder';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, IsAdminGuard)
@Controller('publication')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

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

  @Get('search')
  async findByAdmin(@Body() findByAdmin:FindByAdminDto) {
    return await this.publicationService.findByAdmin(findByAdmin);
  }


  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: CreatePublicationDto,
    @UploadedFile(MyParseFilePipeBuilder)
    file?: Express.Multer.File,
  ) {
    return this.publicationService.update(+id, updatePublicationDto,file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
