import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  user: { id: number };
  total_price: number;
  status: OrderStatus;
}
