import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { employeeModule } from './Employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './Employee/product/product.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    employeeModule, ProductModule,
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

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'kamrulkoche123@gmail.com',
          pass: 'cvsdgbxvjmxnvfuj'
        },
      }
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
