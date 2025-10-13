import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('metodo_pago')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;
}
