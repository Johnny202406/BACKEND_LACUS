import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalle_pedido')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio: number;

  @Column({ type: 'int', default: 1, nullable: false })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @ManyToOne(() => Product, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: Product;

  @ManyToOne(() => Order, (order) => order.detalles, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Order;
}
