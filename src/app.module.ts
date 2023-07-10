import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { employeeModule } from './Employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './Employee/product/product.module';


@Module({
  imports: [
    employeeModule,ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'Employee', //Change to your database name
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
