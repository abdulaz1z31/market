import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['order_products'],
      select: {
        order_products: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.update(id, updateProductDto);
    return { message: 'updated' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    await this.productRepository.delete(id);
    return { message: 'deleted' };
  }
}
