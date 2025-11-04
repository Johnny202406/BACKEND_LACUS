import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ILike, Not, Repository } from 'typeorm';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import cloudinary from 'src/cloudinary';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { UpdateCategoryDto } from './dto/MyUpdateCategory.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';
import { ProductService } from 'src/product/product.service';
import { instanceToPlain } from 'class-transformer';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private productService: ProductService,
  ) {}

  async findAll() {
    return await this.categoryRepository.find({
      order: { id: 'DESC' },
    });
  }
  async findAllEnabled() {
    return await this.categoryRepository.find({
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
    const categoryExists = await this.categoryRepository.findOne({
      where: { nombre: ILike(createCategoryDto.name.trim().toUpperCase()) },
    });

    if (categoryExists)
      throw new ConflictException(
        'La categoría ya existe en la base de datos.',
      );
    try {
      const uploadResult: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: 'category',
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

      const category: Category = this.categoryRepository.create({
        nombre: createCategoryDto.name.trim().toUpperCase(),
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      });
      await this.categoryRepository.save(category);
      return [`This action creates a new category`];
    } catch (e) {
      throw new ConflictException('No se pudo crear la categoría.');
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
    const [category, categoryExists] = await Promise.all([
      this.categoryRepository.findOneBy({ id }),
      this.categoryRepository.findOne({
        where: {
          id: Not(id),
          nombre: ILike(updateCategoryDto.name.trim().toUpperCase()),
        },
      }),
    ]);

    if (!category) throw new NotFoundException('La categoría no se encuentra.');
    if (categoryExists)
      throw new ConflictException(
        'La categoría ya existe en la base de datos.',
      );
    category.nombre = updateCategoryDto.name.trim().toUpperCase();

    try {
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
                  format: 'webp',
                },
                (error, uploadResult) => {
                  if (error) {
                    return reject(error);
                  }
                  return resolve(uploadResult as UploadApiResponse);
                },
              )
              .end(file.buffer);
          },
        );
        category.public_id = uploadResult.public_id;
        category.secure_url = uploadResult.secure_url;
      }
      await this.categoryRepository.save(category);
    } catch (e) {
      throw new ConflictException('No se pudo actualizar la categoría.');
    }
    return [`This action updates a #${id} category`];
  }

  async enabledDisabled(id: number, enabledDisabled: EnabledDisabled) {
    const category = await this.categoryRepository.findOneByOrFail({
      id,
    });
    category.habilitado = enabledDisabled.enabled;
    await this.categoryRepository.save(category);
    return [`This action enables or disables a #${id} category`];
  }

  async findLastCategoriesWithProducts() {
    const categorias = await this.categoryRepository
      .createQueryBuilder('categoria')
      .orderBy('categoria.id', 'DESC')
      .take(6)
      .getMany();

    const resultados:Category[] = [];

    for (const categoria of categorias) {
      const query = this.productService.getBaseSelectQueryBuilder();

      const entidades = await query
        .clone()
        .where('producto.id_categoria = :idCat', { idCat: categoria.id })
        .andWhere('producto.habilitado = true')
        .orderBy('producto.id', 'DESC')
        .take(10)
        .getMany();

      const rawStocks = await query
        .clone()
        .select('producto.id', 'id')
        .addSelect(
          'COALESCE(entradas.total_entradas, 0) - COALESCE(pedidos.total_pedidos, 0)',
          'stock',
        )
        .where('producto.id_categoria = :idCat', { idCat: categoria.id })
        .andWhere('producto.habilitado = true')
        .orderBy('producto.id', 'DESC')
        .take(10)
        .getRawMany();

      for (const entitie of entidades) {
        const raw = rawStocks.find((r) => r.id === entitie.id);
        entitie.stock = raw ? +raw.stock : 0;
      }

      resultados.push({
        ...categoria,
        productos: entidades.map((e) => instanceToPlain(e) as Product),
      });
    }

    return resultados;
  }
}
