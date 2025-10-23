import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  DataSource,
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
          product_id: detail.product_id,
          amount: detail.amount,
        });
        return manager.save(entryDetail);
      });

      await Promise.all(operations);
      return entry;
    });

    return `This action adds a new entry #${result.id} and details`;
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
          ? { fecha: MoreThanOrEqual(startDate) }
          : endDate
            ? { fecha: LessThanOrEqual(endDate) }
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
      relations: ['entry_details', 'entry_details.producto'],
    });

    const productsIds = entry.detalles.map((detail) => detail.producto.id);

    const result = await this.productService.findOnlyStock(productsIds);

    result.forEach((rawProduct) => {
      const detalle = entry.detalles.find(
        (detalle) => detalle.producto.id === rawProduct.id,
      );
      if (detalle && Math.sign(rawProduct.stock - detalle.cantidad) === -1) {
        throw new BadRequestException(
          `No hay suficiente stock del producto #${detalle.producto.nombre} para deshabilitar la entrada `,
        );
      }
    });

    entry.habilitado = false;
    await this.entryRepository.save(entry);

    return `This action disables a #${id} entry`;
  }
}
