import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MechanicDTO } from "./mechanic.DTO";
import { chatwithemployee, MechanicEntity } from "./mechanic.entity";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { EmployeeEntity, chatwithmechanic } from "src/Employee/employee.entity";

@Injectable()
export class MechanicService {
    constructor(
        @InjectRepository(MechanicEntity) private mechanicRepo: Repository<MechanicEntity>,
        @InjectRepository(EmployeeEntity) private customerRepo: Repository<EmployeeEntity>,
        @InjectRepository(chatwithmechanic) private customerChatRepo: Repository<chatwithmechanic>,
        @InjectRepository(chatwithemployee) private mechanicChatRepo: Repository<chatwithemployee>,

    ) { }

   
    async mechanicRegistration(data: MechanicDTO): Promise<MechanicEntity> {
        const pass = await bcrypt.genSalt();
        data.mechanic_password = await bcrypt.hash(data.mechanic_password, pass);
        return this.mechanicRepo.save(data);
    }

   

    


    async chatWithCustomer(data: chatwithemployee): Promise<chatwithemployee> {
        //data.sender = id;
        return this.mechanicChatRepo.save(data);
    }


    async getMechanicChat(id) {
        return this.mechanicChatRepo.find({
            where: { sender: id },
            relations: {
                sender: true,
                receiver:true
            },
        });
    }

    async getemployeeChat(id) {
        return this.customerChatRepo.find({
            where: { receiver: id },
            relations: {
                sender: true,
                receiver: true
            },
        });
    }



    



    


}