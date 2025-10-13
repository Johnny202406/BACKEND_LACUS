import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_entrega')
export class DeliveryType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;
}
