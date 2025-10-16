import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('imagen_producto')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  public_id: string;

  @Column({ type: 'varchar', length: 500 })
  secure_url: string;

  @ManyToOne(() => Product, (product) => product.imagenes, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: Product;
}
