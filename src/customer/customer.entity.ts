import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { chatwithcustomer, MechanicEntity } from "../mechanic/mechanic.entity";

@Entity("customer")
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "varchar", length: 150 })
    name: string;
    @Column({ type: "varchar", length: 256, unique: true })
    email: string;
    @Column({ type: "varchar", length: 150 })
    address: string;
    @Column({ type: "varchar", length: 256 })
    password: string;


    //mechanic chat
    @OneToMany(() => chatwithcustomer, chat => chat.receiver, { cascade: true })
    mechanicchats: chatwithcustomer[];

    //customer chats
    @OneToMany(() => chatwithmechanic, chat => chat.receiver, { cascade: true })
    customerchats: chatwithmechanic[];
}


@Entity('customer_chat')
export class chatwithmechanic {
    @PrimaryGeneratedColumn()
    customer_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => CustomerEntity, sender => sender.customerchats)
    sender: CustomerEntity;

    @ManyToOne(() => MechanicEntity, receiver => receiver.customerchats)
    receiver: MechanicEntity;

}