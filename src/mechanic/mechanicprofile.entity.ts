import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MechanicEntity } from "./mechanic.entity";

@Entity('Mechanic Profile')
export class MechanicProfileEntity {
    @PrimaryGeneratedColumn()
    mechanic_id: number;
    @Column()
    mechanic_gender: string;
    @OneToOne(() => MechanicEntity, mechanic => mechanic.mechanicprofile)
    mechanic: MechanicEntity;

}