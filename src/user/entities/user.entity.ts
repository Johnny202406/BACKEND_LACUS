
import { TypeUser } from 'src/type-user/entities/type-user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity("usuario")
export class User {
    @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  sub: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 15 })
  dni: string;

  @Column({ type: 'varchar', length: 20 })
  numero: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo: string;

  @Column({ type: 'bool', default: true })
  habilitado: boolean;

  @ManyToOne(() => TypeUser, typeUser => typeUser.id)
  @JoinColumn({ name: 'id_tipo_usuario' }) 
  id_tipo_usuario: TypeUser;

}
