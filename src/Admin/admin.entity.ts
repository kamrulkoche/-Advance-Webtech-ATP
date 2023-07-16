import { ManagerEntity } from 'src/manager/manager.entity';
import { MechanicEntity, chatwithadmin } from 'src/mechanic/mechanic.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
@Entity('admin')

export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    gender:string;

    @Column()
    email:string;

    @Column()
    phone:string;
    
    @Column()
    password:string;

    @Column()
    filename: string;

    
    @OneToMany(() => ManagerEntity, (manager) => manager.Admin)
    managers: ManagerEntity[]




    @OneToMany(() => chatwithmechanic, (admin) => admin.sender)
    admin: chatwithmechanic[]
    
    @OneToMany(() => chatwithadmin, (mechanic) => mechanic.receiver)
    mechanic: chatwithadmin[]
    

}


export class AdminUpdateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;
   
}


@Entity('Admin_chat')
export class chatwithmechanic {
    @PrimaryGeneratedColumn()
    admin_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => AdminEntity, sender => sender.mechanic)
    sender: AdminEntity;

    @ManyToOne(() => MechanicEntity, receiver => receiver.admin)
    receiver: MechanicEntity;

}

@Entity('Profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @OneToOne(() => User, (user) => user.profile)
  info: User;
}



