import { Module } from '@nestjs/common';
import { AdminService } from './adminservice.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity, Profile, chatwithmechanic } from './admin.entity';
import { ManagerEntity } from 'src/manager/manager.entity';
import { ManagerService } from 'src/manager/manager.service';
import { NewsEntity } from 'src/news/news.entity';
import { NewsService } from 'src/news/news.service';
import { MechanicEntity,chatwithadmin } from 'src/mechanic/mechanic.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity,ManagerEntity,NewsEntity,MechanicEntity,chatwithadmin, chatwithmechanic,Profile])],
  providers: [AdminService,ManagerService,NewsService],
  controllers: [AdminController],
})
export class adminModule {}
