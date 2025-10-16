import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('metodo_pago')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;

  @OneToMany(() => Order, (order) => order.metodo_pago, {
    eager: false,
    nullable: false,
  })
  pedidos: Order[];
}
