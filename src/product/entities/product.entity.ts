import { Brand } from 'src/brand/entities/brand.entity';
import { Category } from 'src/category/entities/category.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('producto')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text', default: 'Descripción...' })
  descripcion: string;

  @Column({ type: 'float', default: 0 })
  peso_kg: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio: number;

  @Column({ type: 'bool', default: true })
  habilitado: boolean;

  @Column({ type: 'int', default: 0 })
  porcentaje_descuento: number;

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

  @OneToMany(() => ProductImage, productImage => productImage.producto)
  imagenes: ProductImage[];
}
