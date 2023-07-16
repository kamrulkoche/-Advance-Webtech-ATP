
import { AdminEntity, chatwithmechanic } from "src/Admin/admin.entity";
import { Column,Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";



@Entity("mechanic")
export class MechanicEntity {
    @PrimaryGeneratedColumn()
    mechanic_id: number;
    @Column({type: "varchar", length: 150})
    name: string;
    @Column({ type: "varchar", length: 256, unique: true})
    email: string;
   
     @Column({ type: "varchar", length: 256 })
    password: string;
   

    @OneToMany(() => chatwithadmin, chat => chat.sender, { cascade: true })
    mechanicchats: chatwithadmin[];

    @OneToMany(() => chatwithmechanic, chat => chat.receiver, { cascade: true })
    admin: chatwithmechanic[];
}


@Entity()
export class service{
    @PrimaryGeneratedColumn()
    service_id: number;
    @Column()
    service_name: string;
}

@Entity('mechanic_chat')
export class chatwithadmin {
    @PrimaryGeneratedColumn()
    mechanic_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => MechanicEntity, sender => sender.mechanicchats)
    sender: MechanicEntity;

    @ManyToOne(() => AdminEntity, receiver => receiver.mechanic)
    receiver: AdminEntity;
}








