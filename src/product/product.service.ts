import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Brackets, ILike, Not, Repository, SelectQueryBuilder } from 'typeorm';
import { BrandService } from 'src/brand/brand.service';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/MyUpdateProduct';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { instanceToPlain } from 'class-transformer';
import { RawProduct } from 'src/interfaces';
import { UpdateDiscount } from './dto/updateDiscount.dto';
import { EnabledDisabled } from './dto/enabledDisabled.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}

  getBaseSelectQueryBuilder(): SelectQueryBuilder<Product> {
    return this.productRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .leftJoinAndSelect('producto.marca', 'marca')
      .leftJoinAndSelect('producto.imagenes', 'imagenes')
      .leftJoin(
        (qb) =>
          qb
            .from('detalle_entrada', 'de')
            .leftJoin('entrada', 'e', 'e.id = de.id_entrada')
            .select('de.id_producto', 'id_producto')
            .addSelect('SUM(de.cantidad)', 'total_entradas')
            .where('e.habilitado = true')
            .groupBy('de.id_producto'),
        'entradas',
        'entradas.id_producto = producto.id',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('detalle_pedido', 'dp')
            .select('dp.id_producto', 'id_producto')
            .addSelect('SUM(dp.cantidad)', 'total_pedidos')
            .groupBy('dp.id_producto'),
        'pedidos',
        'pedidos.id_producto = producto.id',
      );
  }

  async create(createProductDto: CreateProductDto) {
    const {
      name,
      description = undefined,
      price,
      discount = undefined,
      weight_kg,
      id_category,
      id_brand,
    } = createProductDto;

    const [productExists, category, brand] = await Promise.all([
      this.productRepository.findOne({
        where: { nombre: ILike(name.trim().toUpperCase()) },
      }),
      this.categoryService.findOneEnabled(id_category),
      this.brandService.findOneEnabled(id_brand),
    ]);

    if (productExists)
      throw new ConflictException('El producto ya existe en la base de datos.');
    if (!category)
      throw new NotFoundException('La categoria no se encuentra disponible.');

    if (!brand)
      throw new NotFoundException('La marca no se encuentra disponible.');

    const product = this.productRepository.create({
      codigo: uuidv4(),
      nombre: name.trim().toUpperCase(),
      descripcion: description ? description.trim() : undefined,
      peso_kg: weight_kg,
      precio: price,
      porcentaje_descuento: discount ? discount : undefined,
      categoria: category,
      marca: brand,
    });
    await this.productRepository.save(product);

    return ['This action adds a new product'];
  }

  async findOnlyStock(ids: number[]): Promise<RawProduct[]> {
    const query = this.getBaseSelectQueryBuilder();
    query
      .where('producto.id IN (:...ids)', { ids })
      .select('producto.id', 'id')
      .addSelect(
        'COALESCE(entradas.total_entradas, 0) - COALESCE(pedidos.total_pedidos, 0)',
        'stock',
      );
    const raws = await query.getRawMany();
    raws.forEach((raw) => {
      raw.stock = +raw.stock;
    });
    return raws as RawProduct[];
  }

  async findOneById(id: number) {
    return await this.productRepository.findOneBy({
      id,
    });
  }

  async findOneWithStock(code: string) {
    const query = this.getBaseSelectQueryBuilder();
    query.where('producto.codigo = :code', { code });
    query.andWhere('producto.habilitado = true');

    const entitie = await query.clone().getOneOrFail();

    const raw = await query
      .select('producto.id', 'id')
      .addSelect(
        'COALESCE(entradas.total_entradas, 0) - COALESCE(pedidos.total_pedidos, 0)',
        'stock',
      )
      .getRawOne();

    entitie.stock = +raw.stock;

    return instanceToPlain(entitie);
  }

  async findByAdminWithStock(findByAdminDto: FindByAdminDto) {
    const {
      page,
      pageSize,
      searchByCodeOrName = undefined,
      enabled = undefined,
      discount = undefined,
      id_brand = undefined,
      id_category = undefined,
    } = findByAdminDto;

    const query = this.getBaseSelectQueryBuilder();

    if (enabled) {
      query.andWhere('producto.habilitado = :enabled', { enabled });
    }
    if (discount) {
      query.andWhere('producto.porcentaje_descuento BETWEEN 1 AND 100');
    }
    if (id_brand) {
      query.andWhere('marca.id = :id_brand', { id_brand });
    }
    if (id_category) {
      query.andWhere('categoria.id = :id_category', { id_category });
    }
    if (searchByCodeOrName) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('producto.codigo ILIKE :search').orWhere(
            'producto.nombre ILIKE :search',
          );
        }),
        { search: `%${searchByCodeOrName.trim()}%` },
      );
    }

    query
      .orderBy('producto.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const [entities, count] = await query.clone().getManyAndCount();

    const raw = await query
      .select('producto.id', 'id')
      .addSelect(
        'COALESCE(entradas.total_entradas, 0) - COALESCE(pedidos.total_pedidos, 0)',
        'stock',
      )
      .getRawMany();

    entities.forEach((e) => {
      e.stock = +raw.find((r) => r.id === e.id).stock;
    });

    console.log(entities, count);

    return [instanceToPlain(entities), count];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      name,
      description = undefined,
      price,
      discount = undefined,
      weight_kg,
      id_category,
      id_brand,
    } = updateProductDto;

    const [product, productExists, category, brand] = await Promise.all([
      this.productRepository.findOneBy({ id }),
      this.productRepository.findOne({
        where: {
          id: Not(id),
          nombre: ILike(name.trim().toUpperCase()),
        },
      }),
      this.categoryService.findOneEnabled(id_category),
      this.brandService.findOneEnabled(id_brand),
    ]);

    if (!product) throw new NotFoundException('Producto no encontrado');
    if (productExists)
      throw new ConflictException('Producto ya existe en la base de datos.');
    if (!category)
      throw new NotFoundException('La categoria no se encuentra disponible.');
    if (!brand)
      throw new NotFoundException('La marca no se encuentra disponible.');

    product.nombre = name.trim().toUpperCase();
    description ? (product.descripcion = description.trim()) : undefined;
    product.peso_kg = weight_kg;
    product.precio = price;
    discount?(product.porcentaje_descuento=discount):undefined
    product.categoria = category;
    product.marca = brand;


    await this.productRepository.save(product);

    return [`This action updates a #${id} product`];
  }

  async enabledDisabled(id: number, enabledDisabled: EnabledDisabled) {
    const product = await this.productRepository.findOneByOrFail({ id });
    product.habilitado = enabledDisabled.enabled;
    await this.productRepository.save(product);
    return [`This action enables or disables a #${id} product`];
  }

  async updateDiscount(id: number, updateDiscount: UpdateDiscount) {
    const product = await this.productRepository.findOneByOrFail({ id });
    product.porcentaje_descuento = updateDiscount.discount;
    await this.productRepository.save(product);
    return `This action updates discount a #${id} product`;
  }
}
