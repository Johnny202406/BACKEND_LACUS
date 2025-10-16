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

  @Column({ type: 'varchar', length: 500, nullable: true })
  comprobante: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  xml: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cdr: string;

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
