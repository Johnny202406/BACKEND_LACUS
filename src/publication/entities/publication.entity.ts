import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('publicacion')
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url_redireccion: string|null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  public_id: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  secure_url: string;
}
