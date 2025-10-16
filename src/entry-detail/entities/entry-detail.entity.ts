import { Entry } from 'src/entry/entities/entry.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('detalle_entrada')
export class EntryDetail {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  cantidad: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'id_producto' })
  producto: Product;

  @ManyToOne(() => Entry, (entry) => entry.detalles, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_entrada' })
  entrada: Entry;
}
