import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('carrito')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @OneToOne(() => User, (user) => user.carrito, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.carrito, {
    nullable: false,
    eager: true,
  })
  detalles: CartDetail[];
}
