import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marca')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  habilitado: boolean;

  @Column({ type: 'varchar', length: 255 })
  public_id: string;

  @Column({ type: 'varchar', length: 500 })
  secure_url: string;

  @OneToMany(() => Product, (product) => product.marca, {
    eager: false,
    nullable: false,
  })
  productos: Product[];
}
