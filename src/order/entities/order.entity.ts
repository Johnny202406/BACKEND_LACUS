import { DeliveryType } from 'src/delivery-type/entities/delivery-type.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { OrderStatus } from 'src/order-status/entities/order-status.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('pedido')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  codigo: string;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'time', nullable: false })
  hora: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'point', nullable: false })
  direccion: { x: number; y: number };

  @Column({ type: 'date', nullable: true })
  ultima_fecha: string;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_estado_pedido' })
  estado_pedido: OrderStatus;

  @ManyToOne(() => DeliveryType, (deliveryType) => deliveryType.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_tipo_entrega' })
  tipo_entrega: DeliveryType;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_metodo_pago' })
  metodo_pago: PaymentMethod;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.pedido, {
    eager: false,
    nullable: false,
  })
  detalles: OrderDetail[];

  @OneToOne(() => Invoice, (invoice) => invoice.pedido, {
    eager: false,
    nullable: false,
  })
  comprobante: Invoice;
}
