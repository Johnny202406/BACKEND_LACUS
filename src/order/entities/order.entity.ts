import { DeliveryType } from 'src/delivery-type/entities/delivery-type.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  codigo: string;

  @Column({ type: 'date' , nullable: false})
  fecha: Date;

  @Column({ type: 'time' , nullable: false})
  hora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'point', nullable: false })
  direccion: string; 

  @Column({ type: 'date', nullable: true })
  ultima_fecha: string;

  @ManyToOne(() => OrderStatus,(orderStatus) => orderStatus.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_estado_pedido' })
  id_estado_pedido: OrderStatus;

  @ManyToOne(() => DeliveryType,(deliveryType) => deliveryType.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_tipo_entrega' })
  id_tipo_entrega: DeliveryType;

  @ManyToOne(() => PaymentMethod,(paymentMethod) => paymentMethod.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_metodo_pago' })
  id_metodo_pago: PaymentMethod;

  @ManyToOne(() => User,(user) => user.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: User;
}
