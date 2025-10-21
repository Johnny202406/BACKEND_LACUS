import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from 'src/cloudinary';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { UpdateCategoryDto } from './dto/MyUpdateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.findAndCount({
      order: { id: 'DESC' },
    });
  }
  async findAllEnabled() {
    return await this.categoryRepository.findAndCount({
      where: { habilitado: true },
      order: { id: 'DESC' },
    });
  }
  async findOneEnabled(id: number) {
    return await this.categoryRepository.findOneBy({
      id,
      habilitado: true,
    });
  }
  async create(
    createCategoryDto: CreateCategoryDto,
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

    const category: Category = this.categoryRepository.create({
      nombre: createCategoryDto.name.trim().toUpperCase(),
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    });
    await this.categoryRepository.save(category);
    return `This action creates a new category`;
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

    return await this.categoryRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ) {
    const category: Category = await this.categoryRepository.findOneByOrFail({
      id,
    });
    category.nombre = updateCategoryDto.name.trim().toUpperCase();

    if (file) {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                public_id: category.public_id,
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
    await this.categoryRepository.save(category);

    return `This action updates a #${id} category`;
  }

  async enabledDisabled(id: number, enabled: boolean) {
    const category = await this.categoryRepository.findOneByOrFail({
      id,
    });
    category.habilitado = enabled;
    await this.categoryRepository.save(category);
    return `This action enables or disables a #${id} category`;
  }
}
