import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { UserType } from 'src/user-type/entities/user-type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 36, unique: true })
  sub: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  numero: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  correo: string;

  @Column({ type: 'bool', default: true })
  habilitado: boolean;

  @ManyToOne(() => UserType, (userType) => userType.usuarios, {
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'id_tipo_usuario' })
  tipo_usuario: UserType;

  @OneToOne(() => Cart, (cart) => cart.usuario, {
    eager: false,
    nullable: false,
  })
  carrito:Cart

  @OneToMany(() => Order, (order) => order.usuario, {
    eager: false,
    nullable: false,
  })
  pedidos: Order[];
}
