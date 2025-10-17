import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from 'src/cloudinary';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }
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
      nombre: createCategoryDto.nombre,
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
    });
    return await this.categoryRepository.save(category);
  }

  async findByAdmin(findAllByAdmin: FindByAdminDto) {
    const {
      page,
      pageSize,
      searchByName = undefined,
      enabled = undefined,
    } = findAllByAdmin;
    const where: any = {
      ...(searchByName && {
        titulo: Like(`%${searchByName.trim()}%`),
      }),
      ...(enabled && {
        habilitado: enabled,
      }),
    };

    return await this.categoryRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async update(
    id: number,
    updateCategoryDto: CreateCategoryDto,
    file?: Express.Multer.File,
  ) {
    const category: Category =
      await this.categoryRepository.findOneByOrFail({
        id,
      });
    category.nombre= updateCategoryDto.nombre;

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

  async remove(id: number) {
    const category = await this.categoryRepository.findOneByOrFail({
      id,
    });
    const deletedResult = await cloudinary.uploader.destroy(
      category.public_id,
      {
        resource_type: 'image',
        invalidate: true,
      },
    );
    await this.categoryRepository.remove(category);
    return `This action removes a #${id} category`;
  }
}
