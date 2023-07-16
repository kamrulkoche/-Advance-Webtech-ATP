
//import { EmployeeEntity } from 'src/Employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmployeeEntity } from '../employee.entity';

@Entity("product")
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: string;

    

    @ManyToOne(() => EmployeeEntity, (employee) => employee.products)
    employee: EmployeeEntity
    


}