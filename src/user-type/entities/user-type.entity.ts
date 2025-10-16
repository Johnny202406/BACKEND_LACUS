import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('tipo_usuario')
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => User, (user) => user.tipo_usuario, {
    eager: false,
    nullable: false,
  })
  usuarios: User[];
}
