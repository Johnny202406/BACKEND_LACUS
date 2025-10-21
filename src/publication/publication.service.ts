import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import cloudinary from 'src/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { ILike, Repository } from 'typeorm';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { UpdatePublicationDto } from './dto/MyUpdatePublication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async findAll() {
    return await this.publicationRepository.findAndCount({
      order: { id: 'DESC' },
    });
  }
  async create(
    createPublicationDto: CreatePublicationDto,
    file: Express.Multer.File,
  ) {
    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              transformation: [{ fetch_format: 'webp' }],
            },
            (error, uploadResult) => {
              if (error) {
                return reject(error);
              }
              return resolve(uploadResult as UploadApiResponse);
            },
          )
          .end(file);
      },
    );

    const publication: Publication = this.publicationRepository.create({
      titulo: createPublicationDto.titulo.trim(),
      url_redireccion: createPublicationDto.url_redireccion.trim(),
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    });
    await this.publicationRepository.save(publication);
    return `This action create a publication`;
  }

  async findByAdmin(findByAdminDto: FindByAdminDto) {
    const { page, pageSize, searchByTitle = undefined } = findByAdminDto;
    const where: any = {
      ...(searchByTitle && {
        titulo: ILike(`%${searchByTitle.trim()}%`),
      }),
    };

    return await this.publicationRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    updatePublicationDto: UpdatePublicationDto,
    file?: Express.Multer.File,
  ) {
    const publication: Publication =
      await this.publicationRepository.findOneByOrFail({
        id,
      });
    publication.titulo = updatePublicationDto.titulo.trim();
    publication.url_redireccion = updatePublicationDto.url_redireccion.trim();

    if (file) {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: publication.public_id,
                overwrite: true,
                invalidate: true,
                resource_type: 'image',
                transformation: [{ fetch_format: 'webp' }],
              },
              (error, uploadResult) => {
                if (error) {
                  return reject(error);
                }
                return resolve(uploadResult as UploadApiResponse);
              },
            )
            .end(file);
        },
      );
    }
    await this.publicationRepository.save(publication);

    return `This action updates a #${id} publication`;
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOneByOrFail({
      id,
    });
    const deletedResult = await cloudinary.uploader.destroy(
      publication.public_id,
      {
        resource_type: 'image',
        invalidate: true,
      },
    );
    await this.publicationRepository.remove(publication);
    return `This action removes a #${id} publication`;
  }
}
