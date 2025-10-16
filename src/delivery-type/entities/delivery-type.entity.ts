import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipo_entrega')
export class DeliveryType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;

  @OneToMany(() => Order, (order) => order.tipo_entrega, {
    eager: false,
    nullable: false,
  })
  pedidos: Order[];
}
