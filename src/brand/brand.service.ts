import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import cloudinary from 'src/cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { ILike, Not, Repository } from 'typeorm';
import { UpdateBrandDto } from './dto/MyUpdateBrand.dto';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.findAndCount({
      order: { id: 'DESC' },
    });
  }
  async findAllEnabled() {
    return await this.brandRepository.findAndCount({
      where: { habilitado: true },
      order: { id: 'DESC' },
    });
  }

  async findOneEnabled(id: number) {
    return await this.brandRepository.findOneBy({
      id,
      habilitado: true,
    });
  }
  async create(createBrandDto: CreateBrandDto, file: Express.Multer.File) {
    const brandExists = await this.brandRepository.findOne({
      where: { nombre: ILike(createBrandDto.name.trim().toUpperCase()) },
    });

    if (brandExists)
      throw new ConflictException('La marca ya existe en la base de datos.');

    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'brand',
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
      const brand: Brand = this.brandRepository.create({
        nombre: createBrandDto.name.trim().toUpperCase(),
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
      await this.brandRepository.save(brand);
      return `This action creates a new brand`;
    } catch (e) {
      throw new ConflictException('No se pudo crear la marca.');
    }
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
      ...(enabled !== undefined && {
        habilitado: enabled,
      }),
    };

    return await this.brandRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
    file?: Express.Multer.File,
  ) {
    const [brand, brandExists] = await Promise.all([
      this.brandRepository.findOneBy({ id }),
      this.brandRepository.findOne({
        where: {
          id: Not(id),
          nombre: ILike(updateBrandDto.name.trim().toUpperCase()),
        },
      }),
    ]);

    if (!brand) throw new NotFoundException('La marca no se encuentra.');
    if (brandExists)
      throw new ConflictException('La marca ya existe en la base de datos.');
    brand.nombre = updateBrandDto.name.trim().toUpperCase();

    try {
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
        brand.public_id = uploadResult.public_id;
        brand.secure_url = uploadResult.secure_url;
      }

      await this.brandRepository.save(brand);
    } catch (e) {
      throw new ConflictException('No se pudo actualizar la marca.');
    }

    return `This action updates a #${id} brand`;
  }

  async enabledDisabled(id: number, enabledDisabled: EnabledDisabled) {
    const brand = await this.brandRepository.findOneByOrFail({
      id,
    });
    brand.habilitado = enabledDisabled.enabled;
    await this.brandRepository.save(brand);
    return `This action enables or disables a #${id} brand`;
  }
}
