import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}
  async create(createDto: CreateOrderProductDto): Promise<OrderProduct> {
    return await this.orderProductRepository.save(createDto);
  }

  async findAll(): Promise<OrderProduct[]> {
    return await this.orderProductRepository.find({
      relations: ['order', 'product'],
    });
  }

  async findOne(id: number) {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new BadRequestException('OrderProduct not found');
    }
    return orderProduct;
  }

  async update(
    id: number,
    updateDto: UpdateOrderProductDto,
  ): Promise<{ message: string }> {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new BadRequestException('OrderProduct not found');
    }
    await this.orderProductRepository.update(id, updateDto);
    return { message: 'updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new BadRequestException('OrderProduct not found');
    }
    await this.orderProductRepository.delete(id);
    return { message: 'deleted' };
  }
}
