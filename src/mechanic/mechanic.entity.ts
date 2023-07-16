import { EmployeeEntity, chatwithmechanic } from "src/Employee/employee.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";



@Entity("mechanic")
export class MechanicEntity {
    @PrimaryGeneratedColumn()
    mechanic_id: number;
    @Column({type: "varchar", length: 150})
    mechanic_name: string;
    @Column({ type: "varchar", length: 256, unique: true})
     mechanic_email: string;
   
     @Column({ type: "varchar", length: 256 })
     mechanic_password: string;
   

    @OneToMany(() => chatwithemployee, chat => chat.sender, { cascade: true })
    mechanicchats: chatwithemployee[];

    @OneToMany(() => chatwithmechanic, chat => chat.receiver, { cascade: true })
    employee: chatwithmechanic[];
}


@Entity()
export class service{
    @PrimaryGeneratedColumn()
    service_id: number;
    @Column()
    service_name: string;
}

@Entity('mechanic_chat')
export class chatwithemployee {
    @PrimaryGeneratedColumn()
    mechanic_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => MechanicEntity, sender => sender.mechanicchats)
    sender: MechanicEntity;

    @ManyToOne(() => EmployeeEntity, receiver => receiver.mechanic)
    receiver: EmployeeEntity;
}








