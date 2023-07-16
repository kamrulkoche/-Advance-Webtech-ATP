import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MechanicsController } from "./mechanic.controller";
import { MechanicService } from "./mechanic.service";
import { EmployeeEntity, chatwithmechanic } from "src/Employee/employee.entity";
import { MechanicEntity, chatwithemployee } from "./mechanic.entity";


@Module({
    imports: [TypeOrmModule.forFeature([MechanicEntity, EmployeeEntity, chatwithemployee, chatwithmechanic])],
    controllers: [MechanicsController],
    providers: [MechanicService],
})

export class MechanicModule {}
