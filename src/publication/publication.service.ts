import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import cloudinary from 'src/cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { ILike, Not, Repository } from 'typeorm';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { UpdatePublicationDto } from './dto/MyUpdatePublication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async findAll() {
    return await this.publicationRepository.find({
      order: { id: 'DESC' },
    });
  }
  async create(
    createPublicationDto: CreatePublicationDto,
    file: Express.Multer.File,
  ) {
    const publicationExists = await this.publicationRepository.findOne({
      where: {
        titulo: ILike(createPublicationDto.titulo.trim().toUpperCase()),
      },
    });

    if (publicationExists)
      throw new ConflictException(
        'La publicación ya existe en la base de datos.',
      );
    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder:'publication',
                resource_type: 'image',
                format: 'webp',
              },
              (error, uploadResult) => {
                if (error) {
                  return reject(error as UploadApiErrorResponse);
                }
                return resolve(uploadResult as UploadApiResponse);
              },
            )
            .end(file.buffer);
        },
      );

      const publication: Publication = this.publicationRepository.create({
        titulo: createPublicationDto.titulo.trim().toUpperCase(),
        url_redireccion: createPublicationDto.url_redireccion.trim()||null,
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
      await this.publicationRepository.save(publication);
      return [`This action create a publication`];
    } catch (e) {
      throw new ConflictException('No se pudo crear la publicación');
    }
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
    const [publication, publicationExists] = await Promise.all([
      this.publicationRepository.findOneBy({ id }),
      this.publicationRepository.findOne({
        where: {
          id: Not(id),
          titulo: ILike(updatePublicationDto.titulo.trim().toUpperCase()),
        },
      }),
    ]);

    if (!publication)
      throw new NotFoundException('La publicación no se encuentra.');
    if (publicationExists)
      throw new ConflictException(
        'La publicación ya existe en la base de datos.',
      );
    publication.titulo = updatePublicationDto.titulo.trim();
    publication.url_redireccion = updatePublicationDto.url_redireccion.trim();

    try {
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
                  format: 'webp',
                },
                (error, uploadResult) => {
                  if (error) {
                    return reject(error as UploadApiErrorResponse);
                  }
                  return resolve(uploadResult as UploadApiResponse);
                },
              )
              .end(file.buffer);
          },
        );
        publication.public_id = uploadResult.public_id;
        publication.secure_url = uploadResult.secure_url;
      }
      await this.publicationRepository.save(publication);
    } catch (e) {
      throw new ConflictException('No se pudo actualizar la publicación');
    }
      return [`This action updates a #${id} publication`];

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
    return [`This action removes a #${id} publication`];
  }
}
