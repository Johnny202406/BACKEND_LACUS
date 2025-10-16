import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tarifa_cobertura')
export class CoverageRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  direccion: string;

  @Column({ type: 'point', nullable: false })
  punto_direccion: { x: number; y: number };

  @Column({ type: 'point', nullable: false })
  centro_cobertura: { x: number; y: number };

  @Column({ type: 'float', nullable: false, default: 0 })
  radio_cobertura: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  tarifa_kg_km: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  tarifa_minima: string;
}
