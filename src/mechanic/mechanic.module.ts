import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MechanicsController } from "./mechanic.controller";
import { MechanicService } from "./mechanic.service";
import { MechanicEntity, chatwithadmin,  } from "./mechanic.entity";
import { AdminEntity, chatwithmechanic } from "src/Admin/admin.entity";


@Module({
    imports: [TypeOrmModule.forFeature([MechanicEntity, AdminEntity, chatwithadmin, chatwithmechanic])],
    controllers: [MechanicsController],
    providers: [MechanicService],
})

export class MechanicModule {}
