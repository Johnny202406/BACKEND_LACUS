import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import cloudinary from 'src/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateBrandDto } from './dto/MyUpdateBrand.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.findAndCount();
  }
  async findAllEnabled() {
    return await this.brandRepository.findAndCountBy({ habilitado: true });
  }
  async create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
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

    const brand: Brand = this.brandRepository.create({
      nombre: createBrandDto.nombre.trim().toUpperCase(),
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    });
    await this.brandRepository.save(brand);
    return `This action creates a new brand`;
  }

  async findByAdmin(findByAdminDto: FindByAdminDto) {
    const {
      page,
      pageSize,
      searchByName = undefined,
      enabled = undefined,
    } = findByAdminDto;
    const where: any = {
      ...(searchByName && {
        nombre: ILike(`%${searchByName.trim()}%`),
      }),
      ...(enabled && {
        habilitado: enabled,
      }),
    };

    return await this.brandRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
    file?: Express.Multer.File,
  ) {
    const brand: Brand = await this.brandRepository.findOneByOrFail({
      id,
    });
    brand.nombre = updateBrandDto.nombre.trim().toUpperCase();

    if (file) {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: brand.public_id,
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
    await this.brandRepository.save(brand);

    return `This action updates a #${id} brand`;
  }

  async enabledDisabled(id: number, enabled: boolean) {
    const brand = await this.brandRepository.findOneByOrFail({
      id,
    });
    brand.habilitado = enabled;
    await this.brandRepository.save(brand);
    return `This action enables or disables a #${id} brand`;
  }
}
