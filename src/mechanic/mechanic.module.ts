import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { chatwithmechanic, CustomerEntity } from "../customer/customer.entity";
import { MechanicsController } from "./mechanic.controller";
import { chatwithcustomer, MechanicEntity, MechanicServiceEntity, ServiceEntity } from "./mechanic.entity";
import { MechanicService } from "./mechanic.service";
import { MechanicProfileEntity } from "./mechanicprofile.entity";


@Module({
    imports: [TypeOrmModule.forFeature([MechanicEntity, CustomerEntity, chatwithcustomer, chatwithmechanic, ServiceEntity, MechanicServiceEntity,MechanicProfileEntity])],
    controllers: [MechanicsController],
    providers: [MechanicService],
})

export class MechanicModule {}
