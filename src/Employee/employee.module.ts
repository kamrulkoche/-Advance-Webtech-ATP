import { Module } from '@nestjs/common';
import { EmployeeService } from './employeeservice.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity, Profile, chatwithmechanic } from './employee.entity';
import { ProductEntity } from './product/product.entity';
import { ProductService } from './product/product.service';
import { MechanicEntity, chatwithemployee } from 'src/mechanic/mechanic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, ProductEntity,MechanicEntity,chatwithemployee, chatwithmechanic,Profile])],
  providers: [EmployeeService, ProductService],
  controllers: [EmployeeController],
})
export class employeeModule { }
