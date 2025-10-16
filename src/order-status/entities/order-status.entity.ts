import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('estado_pedido')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;

  @OneToMany(() => Order, (order) => order.estado_pedido, {
    eager: false,
    nullable: false,
  })
  pedidos: Order[];
}
