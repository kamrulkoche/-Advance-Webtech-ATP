import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CustomerEntity, OrderEntity, ProductEntity } from './customer.entity';
import { PaymentEntity } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity,OrderEntity,ProductEntity,CartEntity,PaymentEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
