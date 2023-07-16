import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './manager/manager.module';
import { adminModule } from './Admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { NewsModule } from './news/news.module';
import { MechanicModule } from './mechanic/mechanic.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    adminModule,ManagerModule,NewsModule,MechanicModule,UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'Adol', //Change to your database name
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
export class AppModule {}
