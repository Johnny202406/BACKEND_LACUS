import { InvoiceType } from 'src/invoice-type/entities/invoice-type.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('comprobante')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 11, nullable: true })
  ruc: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  razon_social: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 510, nullable: true })
  nombres: string;

  @ManyToOne(() => InvoiceType, (invoiceType) => invoiceType.comprobantes, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_tipo_comprobante' })
  tipo_comprobante: InvoiceType;

  @OneToOne(() => Order, (order) => order.comprobante, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_pedido' })
  pedido: Order;
}
