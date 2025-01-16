import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  active = 'active',
  inactive = 'inactive',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.active })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => OrderProduct, (order_porduct) => order_porduct.order, {
    onDelete: 'CASCADE',
  })
  order_products: OrderProduct[];
}
