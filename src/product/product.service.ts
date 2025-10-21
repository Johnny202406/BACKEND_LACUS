import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  Brackets,
  ILike,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { BrandService } from 'src/brand/brand.service';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/MyUpdateProduct';
import { FindByAdminDto } from './dto/findByAdmin.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private brandService: BrandService,
    private categoryService: CategoryService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const {
      name,
      description = undefined,
      weight_kg,
      price,
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
      nombre: name.trim().toUpperCase(),
      descripcion: description ? description.trim() : undefined,
      peso_kg: weight_kg,
      precio: price,
      categoria: category,
      marca: brand,
    });
    await this.productRepository.save(product);

    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }


  async findOneByCode(code: string) {
    return await this.productRepository.findOneOrFail({
      where: { codigo: code, habilitado: true },
      relations: ['categoria', 'marca', 'imagenes'],
    });
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

    const query = this.productRepository
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .leftJoinAndSelect('producto.marca', 'marca');

    query.leftJoin(
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
    );

    query.leftJoin(
      (qb) =>
        qb
          .from('detalle_pedido', 'dp')
          .select('dp.id_producto', 'id_producto')
          .addSelect('SUM(dp.cantidad)', 'total_pedidos')
          .groupBy('dp.id_producto'),
      'pedidos',
      'pedidos.id_producto = producto.id',
    );

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
    const clone = query.clone();
    const queryOther=new SelectQueryBuilder(clone)
    queryOther.orderBy('producto.id', 'DESC');
    const [entities, count] = await queryOther.getManyAndCount();

    
    query
    .select('producto.id','id')
    .addSelect(
      'COALESCE(entradas.total_entradas, 0) - COALESCE(pedidos.total_pedidos, 0)',
      'stock',
    );

    query
      .orderBy('producto.id', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize);

    const raw = await query.getRawMany();
    console.log(query.getSql());
    console.log(raw, entities, count);

    return [raw, entities, count];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      name,
      description = undefined,
      weight_kg,
      price,
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
    product.categoria = category;
    product.marca = brand;

    await this.productRepository.save(product);

    return `This action updates a #${id} product`;
  }

  async enableDisabled(id: number, enabled: boolean) {
    const product = await this.productRepository.findOneByOrFail({ id });
    product.habilitado = enabled;
    await this.productRepository.save(product);
    return `This action enables or disables a #${id} product`;
  }

  async updateDiscount(id: number, discount: number) {
    const product = await this.productRepository.findOneByOrFail({ id });
    product.porcentaje_descuento = discount;
    await this.productRepository.save(product);
    return `This action updates discount a #${id} product`;
  }
}
