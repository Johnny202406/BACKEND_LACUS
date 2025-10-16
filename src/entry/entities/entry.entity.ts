import { EntryDetail } from 'src/entry-detail/entities/entry-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('entrada')
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'time', nullable: false })
  hora: Date;

  @Column({ type: 'bool', default: true })
  habilitado: boolean;

  @OneToMany(() => EntryDetail, (entryDetail) => entryDetail.entrada, {
    eager: false,
    nullable: false,
  })
  detalles: EntryDetail[];
}
