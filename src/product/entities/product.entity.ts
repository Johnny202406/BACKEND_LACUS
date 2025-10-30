import { Expose } from 'class-transformer';
import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { EntryDetail } from 'src/entry-detail/entities/entry-detail.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('producto')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, nullable: false })
  @Generated('uuid')
  codigo: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 1000,
    default: 'Descripción...',
    nullable: true,
  })
  descripcion: string;

  @Column({ type: 'float', default: 0, nullable: false })
  peso_kg: number;

  @Column({
    type: 'float',
    default: 0,
    nullable: false,
  })
  precio: number;

  @Column({ type: 'bool', default: true, nullable: false })
  habilitado: boolean;

  @Column({ type: 'int', default: 0, nullable: false })
  porcentaje_descuento: number;

  @Expose({ name: 'precio_final' })
  get precio_final(): number {
    return +(this.precio * ((100 - this.porcentaje_descuento) / 100)).toFixed(
      2,
    );
  }

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: Category;

  @ManyToOne(() => Brand, (brand) => brand.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_marca' })
  marca: Brand;

  @OneToMany(() => ProductImage, (productImage) => productImage.producto)
  imagenes: ProductImage[];

  @OneToMany(() => EntryDetail, (entryDetail) => entryDetail.producto, {
    eager: false,
  })
  detallesEntrada: EntryDetail[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.producto, {
    eager: false,
  })
  detallesPedido: EntryDetail[];

  stock:number
}
