import { Invoice } from 'src/invoice/entities/invoice.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipo_comprobante')
export class InvoiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;

  @OneToMany(() => Invoice, (invoice) => invoice.tipo_comprobante, {
    eager: false,
    nullable: false,
  })
  comprobantes: Invoice[];
}
