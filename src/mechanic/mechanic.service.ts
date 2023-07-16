import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MechanicDTO, MechanicLoginDTO, MechanicUpdateDTO, MechanicUpdatePassDTO } from "./mechanic.DTO";
import { MechanicEntity, chatwithadmin } from "./mechanic.entity";
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { chatwithmechanic } from "src/Admin/admin.entity";

@Injectable()
export class MechanicService {
    constructor(
        @InjectRepository(MechanicEntity) private mechanicRepo: Repository<MechanicEntity>,
        @InjectRepository(chatwithmechanic) private adminChatRepo: Repository<chatwithmechanic>,
        @InjectRepository(chatwithadmin) private mechanicChatRepo: Repository<chatwithadmin>,

    ) { }

  

    async mechanicRegistration(data: MechanicDTO): Promise<MechanicEntity> {
        const pass = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, pass);
        return this.mechanicRepo.save(data);
    }

   

    


    async chatWithCustomer(data: chatwithadmin): Promise<chatwithadmin> {
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

    async getadminChat(id) {
        return this.adminChatRepo.find({
            where: { receiver: id },
            relations: {
                sender: true,
                receiver: true
            },
        });
    }



    



    


}