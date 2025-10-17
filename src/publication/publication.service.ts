import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import cloudinary from 'src/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Like, Repository } from 'typeorm';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}
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
    return await this.publicationRepository.save(publication);
  }

  async findByAdmin(findAllByAdmin: FindByAdminDto) {
    const { page, pageSize, searchByTitle = undefined } = findAllByAdmin;
    const where: any = {
      ...(searchByTitle && {
        titulo: Like(`%${searchByTitle.trim()}%`),
      }),
    };

    return await this.publicationRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async update(
    id: number,
    updatePublicationDto: CreatePublicationDto,
    file?: Express.Multer.File,
  ) {
    const publication: Publication =
      await this.publicationRepository.findOneByOrFail({
        id,
      });
    publication.titulo = updatePublicationDto.titulo;
    publication.url_redireccion = updatePublicationDto.url_redireccion;

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
