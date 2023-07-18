import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./customer.entity";

@Entity('Payment')
export class PaymentEntity{
    @PrimaryGeneratedColumn()
    paymentid:number;
    @Column()
    total_amount:number;
    @Column()
    payment_method: string;
    
    @OneToOne(()=>OrderEntity,order=>order.payment)
    order:OrderEntity;
}