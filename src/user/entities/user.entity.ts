import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { userRoles } from '../user.types';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: userRoles })
  role: userRoles;

  @OneToMany(() => Order, (order) => order.user, {
    onDelete: 'CASCADE',
  })
  orders: Order[];
}
