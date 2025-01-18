import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order_product/order_product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Order } from './order/entities/order.entity';
import { OrderProduct } from './order_product/entities/order_product.entity';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    OrderProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'postgres',
      entities: [User, Product, Order, OrderProduct],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
