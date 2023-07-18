import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@Entity('customer')
export class CustomerEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar",length: 180})
    name:string;
    @Column({unique:true})
    email:string;
    @Column()
    address:string;
    @Column()
    phone:number;
    @Column()
    password:string;
    @Column()
    gender:string;
    @Column()
    profile:string;

    @OneToMany(()=>CartEntity,cart=>cart.customer,{cascade:true})
    cart:CartEntity[];

    @OneToMany(()=>OrderEntity,order=>order.customer,{cascade:true})
    orders:OrderEntity[];
    
}



@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    productid: number;
    @Column()
    productname:string;
    @Column()
    productprice: number;
    @Column()
    productstock: number;

    @OneToMany(()=>CartEntity,cart=>cart.product,{cascade:true})
    cart: CartEntity[];
    
    @OneToMany(()=>OrderEntity,order=>order.product,{cascade:true})
    order:OrderEntity[];

}

@Entity('cart')
export class CartEntity{
    @PrimaryGeneratedColumn()
    cartid: number;
    
    @Column()
    quantity:number;

    @Column()
    totalbill: number;

    @ManyToOne(()=>CustomerEntity,customer=>customer.cart)
    customer: CustomerEntity;

    @ManyToOne(()=>ProductEntity,product=>product.cart)
    product: ProductEntity;

}



@Entity('order')
export class OrderEntity{
    @PrimaryGeneratedColumn()
    orderid: number;

    @Column()
    quantity: number;

    @Column()
    total:number;

    @ManyToOne(()=>ProductEntity,product=>product.order)
   product:ProductEntity;
    
    @ManyToOne(()=>CustomerEntity,customer=>customer.orders)
    customer:CustomerEntity;

    @OneToOne(()=>PaymentEntity,payment=>payment.order,{cascade:true})
    @JoinColumn() 
    payment:PaymentEntity;

}













