import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['order_products'],
      select: {
        order_products: true,
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<{ message: string }> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    await this.orderRepository.update(id, updateOrderDto);
    return { message: 'updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    await this.orderRepository.delete(id);
    return { message: 'deleted' };
  }
}
