import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssignServiceDTO, MechanicDTO, MechanicLoginDTO, MechanicServiceDTO, MechanicUpdateDTO, MechanicUpdatePassDTO } from "./mechanic.DTO";
import { chatwithcustomer, MechanicEntity, MechanicServiceEntity, ServiceEntity } from "./mechanic.entity";
import * as bcrypt from 'bcrypt';
import { Like, Repository } from "typeorm";
import { chatwithmechanic, CustomerEntity } from "../customer/customer.entity";
import { MechanicProfileEntity } from "./mechanicprofile.entity";

@Injectable()
export class MechanicService {
    constructor(
        @InjectRepository(MechanicEntity) private mechanicRepo: Repository<MechanicEntity>,
        @InjectRepository(MechanicProfileEntity) private mechanicProfileRepo: Repository<MechanicProfileEntity>,
        @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
        @InjectRepository(chatwithmechanic) private customerChatRepo: Repository<chatwithmechanic>,
        @InjectRepository(chatwithcustomer) private mechanicChatRepo: Repository<chatwithcustomer>,
        @InjectRepository(ServiceEntity) private serviceRepo: Repository<ServiceEntity>,
        @InjectRepository(MechanicServiceEntity) private mechanicServiceRepo: Repository<MechanicServiceEntity>,

    ) { }

    ///////////////////////////Registration part start here///////////////////////////////


    //registration part
    async mechanicRegistration(data: MechanicEntity, profile: MechanicProfileEntity): Promise<MechanicEntity> {
        profile.mechanic = data;
        const pass = await bcrypt.genSalt();
        data.mechanic_password = await bcrypt.hash(data.mechanic_password, pass);
        await this.mechanicProfileRepo.save(profile);
        return this.mechanicRepo.save(data);
    }

    //check email existance
    async checkEmail(email): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_email: email });
    }

    //check nid existance
    async checkNid(nid): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_nid: nid });
    }

    //check phone existance
    async checkPhone(phone): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_phone: phone });
    }


    //////////////////////////////Registration part end here//////////////////////////////


    /////////////////////////////Login part start here////////////////////////////////////

    //login part
    async mechanicLogin(data: MechanicLoginDTO) {
        const login = await this.mechanicRepo.findOneBy({ mechanic_email: data.mechanic_email });
        const isMatch: boolean = await bcrypt.compare(data.mechanic_password, login.mechanic_password);
        if (isMatch) {
            return isMatch;
        }
        else {
            return false;
        }
    }

    ///////////////////////////////////Login part end here///////////////////////////////////

    //////////////////////////////////Profile part start here////////////////////////////////

    //Get/Show profile
    async getProfile(email): Promise<MechanicEntity> {
        return this.mechanicRepo.findOneBy({ mechanic_email:email });
    }


    //Update Profile
    async updateProfile(id, data: MechanicUpdateDTO): Promise<any>{
        return this.mechanicRepo.update(id, data);
    }


    //verify password
    async verifyPassword(id, data: MechanicUpdatePassDTO): Promise<any>  {
        const profile = await this.mechanicRepo.findOneBy({ mechanic_id: id });
        const isMatch: boolean = await bcrypt.compare(data.mechanic_password, profile.mechanic_password);
        if (isMatch) {
            return isMatch;
        }
        else {
            return false;
        }
    }

    //update password
    async changePassword(id, password): Promise<any>  {
        const pass = await bcrypt.genSalt();
        password = await bcrypt.hash(password, pass);
        return this.mechanicRepo.update(id, { mechanic_password: password });
    }

    //Delete Mechanic Profile
    async deleteProfile(id) {
        return this.mechanicRepo.delete(id);
    }

    //////////////////////////////////////Profile part end here///////////////////////////////

    /////////////////////////////////////chat part start here////////////////////////////////

    //send message to customer
    async chatWithCustomer(id, data: chatwithcustomer): Promise<chatwithcustomer> {
        data.sender = id;
        return this.mechanicChatRepo.save(data);
    }

    //get mechanic message
    async getMechanicChat(id) {
        return this.mechanicChatRepo.find({
            where: { sender: id },
            relations: {
                sender: true,
                receiver:true
            },
        });
    }

    //get customer message
    async getCustomerChat(id) {
        return this.customerChatRepo.find({
            where: { receiver: id },
            relations: {
                sender: true,
                receiver: true
            },
        });
    }

    //////////////////////////////////////Chat part end here/////////////////////////////////////////////

    ///////////////////////////////////// Service part start here ///////////////////////////////////////

    //create Service
    async createService(data: MechanicServiceDTO) {
        return this.serviceRepo.save(data);
    }


    /*async assignService(mechanic_email, service_id): Promise<void> {
        const mechanicid = await this.mechanicRepo.findOneBy({ mechanic_email: mechanic_email });
        const mechanic = await this.mechanicRepo.findOneBy({ mechanic_id: mechanicid.mechanic_id });
        const service = await this.serviceRepo.findOneBy({ service_id: service_id.service_id });
        if (service) {
            mechanic.services = [...mechanic.services, service];
            await this.mechanicRepo.save(mechanic);
        }
        else {
            throw new HttpException('Service not available', HttpStatus.BAD_REQUEST);

        }
    }*/


    //add Mechanic Service
    async addMechanicService(id,data) {
        data.mechanic = id;
        return this.mechanicServiceRepo.save(data);
    }

    //get mechanic service
    async getServiceByMechanicId(id) {
        return this.mechanicServiceRepo.find({
            where: { mechanic: id },
            relations: {
                mechanic: true,
                service:true
            },
        });
    }

    async getServiceByServiceType() {
        return this.serviceRepo.find({
            relations: {
                services: true,
            },
            where: { service_name:Like("%Fridge%") } 
        });

    }


    ///////////////////////////////////Service part end here ////////////////////////////////////////////
    



    


}