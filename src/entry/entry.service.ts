import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DataSource,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Entry } from './entities/entry.entity';
import { EntryDetail } from 'src/entry-detail/entities/entry-detail.entity';
import { FindByAdminDto } from './dto/findByAdmin.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    private dataSource: DataSource,
    private productService: ProductService,
  ) {}
  async create(createEntryDto: CreateEntryDto) {
    const { data } = createEntryDto;
    const result = await this.dataSource.transaction(async (manager) => {
      const now = new Date();
      const entity = manager.create(Entry, { fecha: now, hora: now });
      const entry = await manager.save(entity);

      const operations = data.map((detail) => {
        const entryDetail = manager.create(EntryDetail, {
          entrada: entry,
          producto: { id: detail.product_id },
          cantidad: detail.amount,
        });
        return manager.save(entryDetail);
      });

      const entryDetails = await Promise.all(operations);

      const total = entryDetails.reduce((acc, entryDetail) => {
        return acc + (entryDetail.cantidad ?? 0);
      }, 0);

      await manager.update(Entry, entry.id, { total });
      return entry;
    });

    return [`This action adds a new entry #${result.id} and details`];
  }

  async findByAdmin(findByAdminDto: FindByAdminDto) {
    const {
      page,
      pageSize,
      startDate = undefined,
      endDate = undefined,
      enabled = undefined,
    } = findByAdminDto;

    const where: any = {
      ...(startDate && endDate
        ? { fecha: Between(startDate, endDate) }
        : startDate
          ? { fecha: Equal(startDate) }
          : endDate
            ? { fecha: Equal(endDate) }
            : undefined),
      ...(enabled && { habilitado: enabled }),
    };

    return await this.entryRepository.findAndCount({
      where: where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });
  }

  async disabled(id: number) {
    const entry = await this.entryRepository.findOneOrFail({
      where: { id },
      relations: ['detalles', 'detalles.producto'],
    });

    const productsIds = entry.detalles.map((detail) => detail.producto.id);

    const result = await this.productService.findOnlyStock(productsIds);

    const errores: string[] = [];

    result.forEach((rawProduct) => {
      const detalle = entry.detalles.find(
        (detalle) => detalle.producto.id === rawProduct.id,
      );
      if (detalle && Math.sign(rawProduct.stock - detalle.cantidad) === -1) {
        errores.push(
          `No hay suficiente stock del producto #${detalle.producto.nombre}`,
        );
      }
    });

    if (errores.length > 0) {
      throw new BadRequestException(errores.join(', '));
    }

    entry.habilitado = false;
    await this.entryRepository.save(entry);

    return [`This action disables a #${id} entry`];
  }
}
