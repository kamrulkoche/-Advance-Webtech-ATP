import { Injectable } from "@nestjs/common";
import { CartEntity, CustomerEntity, OrderEntity, ProductEntity } from "./customer.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerDto, loginDto, updateproDto } from "./customer.dto";
import * as bcrypt from 'bcrypt';
import { promises } from "dns";
import { PaymentEntity } from "./payment.entity";

@Injectable()
export class CustomerService{
    constructor(
    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CartEntity)
    private cartRepo: Repository<CartEntity>,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
    @InjectRepository(PaymentEntity)
    private payRepo:Repository<PaymentEntity>,

    ){}

    async registrationCustomer(data:CustomerDto):Promise<CustomerEntity>{
        const pass = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, pass);
        return this.customerRepo.save(data);
    }

    async login(data:loginDto){
        const login = await  this.customerRepo.findOneBy({email:data.email});  
        const pass:boolean = await bcrypt.compare(data.password,login.password);
        if(pass==true){
            return true;
        }
        else{
            return false;
        }
    }

    async getEmail(email){
        return this.customerRepo.findOneBy({email:email});
    }

    async getProfile(email){
        return this.customerRepo.findOneBy({email:email});
    }

    async updateProfile(id,data:updateproDto){
        return this.customerRepo.update(id,data);

    }

    async deleteProfile(id){
        return this.customerRepo.delete(id);
        
    }

    async addProduct(data):Promise<ProductEntity>{
        return this.productRepo.save(data);
    }

    async getProduct(id):Promise<ProductEntity>{
        return this.productRepo.findOneBy(id);
    }

    async updateProduct(id,data){
        return this.productRepo.update(id,data);
    }

    async deleteProduct(id){
        return this.productRepo.delete(id);
    }

    async addOrder(data):Promise<OrderEntity>{
        return this.orderRepo.save(data);
    }

    async getOrder(id):Promise<OrderEntity>{
        return this.orderRepo.findOneBy(id);
    }

    async updateOrder(id,data){
        return this.orderRepo.update(id,data);
    }
    
    async deleteOrder(id){
        return this.orderRepo.delete(id);
    }

    async addPayment(data):Promise<PaymentEntity>{
        return this.payRepo.save(data);
    }

    async getPay(id):Promise<PaymentEntity>{
        return this.payRepo.findOneBy(id);
    }

    async addCart(id):Promise<CartEntity>{
        return this.cartRepo.findOneBy(id);
    }


    

    


    
    

}
    