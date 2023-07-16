import { MechanicEntity, chatwithemployee } from 'src/mechanic/mechanic.entity';
import { ProductEntity } from './product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/users/user.entity';


@Entity('employee')
export class EmployeeEntity {
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


    @OneToMany(() => ProductEntity, (product) => product.employee)
    products: ProductEntity[]
    
    @OneToMany(() => chatwithmechanic, (employee) => employee.sender)
    employee: chatwithmechanic[]
    
    @OneToMany(() => chatwithemployee, (mechanic) => mechanic.receiver)
    mechanic: chatwithemployee[]
    

    
    // @Column()
    // birthday: string;

    // @Column()
    // email:string;

    // @Column()
    // phone: string;

    // @Column()
    // address:string;

    // @Column()
    // username: string;

    // @Column()
    // password:string;

    // @Column()
    // confirmpassword: string;
}
// ------------------- EmployeeEntity Routes [End] ---------------------//

export class EmployeeUpdateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

   
}



@Entity('employee_chat')
export class chatwithmechanic {
    @PrimaryGeneratedColumn()
    employee_chat_id: number;

    @Column()
    message: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @ManyToOne(() => EmployeeEntity, sender => sender.mechanic)
    sender: EmployeeEntity;

    @ManyToOne(() => MechanicEntity, receiver => receiver.employee)
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


