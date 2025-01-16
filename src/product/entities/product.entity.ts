import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  info: string;

  @Column()
  is_active: boolean;

  @Column()
  quantity: number;

  @OneToMany(() => OrderProduct, (order_product) => order_product.product, {
    onDelete: 'CASCADE',
  })
  order_products: OrderProduct[];
}
