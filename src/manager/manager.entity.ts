import { AdminEntity } from 'src/Admin/admin.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("manager")
export class ManagerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @ManyToOne(() => AdminEntity, (Admin) => Admin.managers)
    Admin: AdminEntity


}