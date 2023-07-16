import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { chatwithcustomer } from "../mechanic/mechanic.entity";
import { CustomerDTO, CustomerLoginDTO } from "./customer.DTO";
import { chatwithmechanic, CustomerEntity } from "./customer.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
        @InjectRepository(chatwithmechanic) private customerChatRepo: Repository<chatwithmechanic>,
        @InjectRepository(chatwithcustomer) private mechanicChatRepo: Repository<chatwithcustomer>,
    ) { }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //check email existance
    async checkEmail(email): Promise<CustomerEntity> {
        return this.customerRepo.findOneBy({ email: email });
    }

    //Customer Registration part
    async addCustomer(data: CustomerDTO): Promise<CustomerEntity> {
        return this.customerRepo.save(data);
    }

    //Customer login part 
    async customerLogin(data: CustomerLoginDTO) {
        const login = await this.customerRepo.findOneBy({ email: data.email });
        if (data.password == login.password) {
            return true;
        }
        else {
            return false;
        }
    }


    getProfile(email): Promise<any> {
        return this.customerRepo.findOneBy({ email: email });
    }


    async chatWithMechanic(id, data: chatwithmechanic): Promise<chatwithmechanic> {
        data.sender = id;
        return this.customerChatRepo.save(data);
    }


    async getCustomerChat(id) {
        return this.customerChatRepo.find({
            where: { sender: id },
            relations: {
                sender: true,
                receiver:true
            },
        });
    }

    async getMechanicChat(id) {
        return this.mechanicChatRepo.find({
            where: { receiver: id },
            relations: {
                sender: true,
                receiver: true
            },
        });
    }
}
