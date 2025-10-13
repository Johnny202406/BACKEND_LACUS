import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estado_pedido')
export class OrderStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  nombre: string;
}
