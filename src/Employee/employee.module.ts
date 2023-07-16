import { Module } from '@nestjs/common';
import { EmployeeService } from './employeeservice.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { ProductEntity } from './product/product.entity';
import { ProductService } from './product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, ProductEntity])],
  providers: [EmployeeService, ProductService],
  controllers: [EmployeeController],
})
export class employeeModule { }
