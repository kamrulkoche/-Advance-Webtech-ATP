import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [CustomerModule,TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sithi123',
      database: 'best_click_store',
      autoLoadEntities: true,
      synchronize: true,
  }
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
