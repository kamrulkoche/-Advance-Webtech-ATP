import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CutomerModule } from './customer/customer.module';
import { MechanicModule } from './mechanic/mechanic.module';


@Module({
    imports: [MechanicModule, CutomerModule, TypeOrmModule.forRoot(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Hasib282@',
            database: 'one_click_store',
            autoLoadEntities: true,
            synchronize: true,
        }),    ],
      controllers: [],
      providers: [],
})
export class AppModule {}
