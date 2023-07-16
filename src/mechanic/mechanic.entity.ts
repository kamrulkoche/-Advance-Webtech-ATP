import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { chatwithmechanic, CustomerEntity } from "../customer/customer.entity";
import { MechanicProfileEntity } from "./mechanicprofile.entity";


@Entity("mechanic")
export class MechanicEntity {
    @PrimaryGeneratedColumn()
    mechanic_id: number;
    @Column({type: "varchar", length: 150})
    mechanic_name: string;
    @Column({ type: "varchar", length: 256, unique: true})
    mechanic_email: string;
    @Column({ unique: true })
    mechanic_phone: string;
    @Column({ type: "varchar", length: 50, unique: true })
    mechanic_nid: string;
    @Column({ type: "varchar", length: 150 })
    mechanic_address: string;
    @Column({ type: "varchar", length: 256 })
    mechanic_password: string;
    @Column()
    photo: string;


    @OneToMany(() => chatwithcustomer, chat => chat.sender, { cascade: true })
    mechanicchats: chatwithcustomer[];

    @OneToMany(() => chatwithmechanic, chat => chat.sender, { cascade: true })
    customerchats: chatwithmechanic[];

    @OneToMany(() => MechanicServiceEntity, service => service.mechanic, { cascade: true })
    services: MechanicServiceEntity[];

    /*@ManyToMany(() => ServiceEntity, service => service.mechanics)
    @JoinTable()
    services: ServiceEntity[];*/

    @OneToOne(() => MechanicProfileEntity, userProfile => userProfile.mechanic, {
        cascade: true
    })
    @JoinColumn()
    mechanicprofile: MechanicProfileEntity;
}





@Entity('services')
export class ServiceEntity{
    @PrimaryGeneratedColumn()
    service_id: number;

    @Column()
    service_name: string;

    /*@ManyToMany(() => MechanicEntity, mechanic => mechanic.services, { cascade:true })
    mechanics: MechanicEntity[];*/

    @OneToMany(() => MechanicServiceEntity, service => service.service, { cascade: true })
    services: MechanicServiceEntity[];
}


@Entity('mechanic_services')
export class MechanicServiceEntity {
    @PrimaryGeneratedColumn()
    mechanic_service_id: number;

    @Column()
    service_charge: number;

    @ManyToOne(() => MechanicEntity, mechanic => mechanic.services)
    mechanic: MechanicEntity;

    @ManyToOne(() => ServiceEntity, service => service.services)
    service: ServiceEntity;
}



@Entity('mechanic_chat')
export class chatwithcustomer {
    @PrimaryGeneratedColumn()
    mechanic_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => MechanicEntity, sender => sender.mechanicchats)
    sender: MechanicEntity;

    @ManyToOne(() => CustomerEntity, receiver => receiver.mechanicchats)
    receiver: CustomerEntity;
}








