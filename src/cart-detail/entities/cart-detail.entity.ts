import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('detalle_carrito')
export class CartDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  cantidad: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'id_producto' })
  producto: Product;

  @ManyToOne(() => Cart, (cart) => cart.detalles, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_carrito' })
  carrito: Cart;
}
