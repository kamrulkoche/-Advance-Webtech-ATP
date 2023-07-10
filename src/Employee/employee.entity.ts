import { ProductEntity } from './product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity('employee')

// ------------------- EmployeeEntity Routes [Start] ---------------------//
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
    phone:number;
    
    @Column()
    password:string;

    @Column()
    filename: string;


    @OneToMany(() => ProductEntity, (product) => product.employee)
    products: ProductEntity[]
    
    

    
   

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



