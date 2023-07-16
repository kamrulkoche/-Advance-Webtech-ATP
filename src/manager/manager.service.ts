import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerForm, UpdateManagerForm } from "./manager.dto";

import { ManagerEntity } from "./manager.entity";


@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepo: Repository<ManagerEntity>,
  ) { }

 // -------------------insertManager Routes [Start] ---------------------//
  insertManager(mydto: ManagerForm): any {
    return this.managerRepo.save(mydto);
  }


  
  getAdminByManagerID(id): any {
    return this.managerRepo.find({
      where: { id: id },
      relations: {
        Admin: true,
      },
    });
  }

  // -------------------updateManagerbyID Routes [Start] ---------------------//
  async updateManagerbyID(
    id: number,
    data: UpdateManagerForm,
  ): Promise<any> {
    return this.managerRepo.update(id, data);
    //return this.managerRepo.findOneBy({ id });
  }
  // ------------------- updateManagerbyID Routes [End] ---------------------//


}