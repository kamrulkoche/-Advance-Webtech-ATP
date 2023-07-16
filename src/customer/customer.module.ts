import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatwithcustomer } from "../mechanic/mechanic.entity";
import { CustomerController } from "./customer.controller";
import { chatwithmechanic, CustomerEntity } from "./customer.entity";
import { CustomerService } from "./customer.service";

@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity,chatwithcustomer,chatwithmechanic])],
    controllers: [CustomerController],
    providers: [CustomerService]
})

export class CutomerModule { }