import { IsEmail, IsIn, IsNotEmpty, IsString, Matches, isNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CustomerDto{
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#@$%]).{8,}$/,{message:"Password must contain at least one of the special characters"})
    password: string;
    @IsNotEmpty()
    address: string;
    @Matches(/^[0-9]{11}$/,{message:"phone number must be 11 digit"})
    phone:number;
    @IsIn(['male','female','others'])
    gender:string;
    
    profile:string;


    }

    export class loginDto{
        @IsEmail()
        email:string;
        @IsNotEmpty()
        password:string;
    }
    
    export class updateproDto{
        @IsString()
        name: string;
        @IsEmail()
        email: string;
        @IsNotEmpty()
        address: string;
        @Matches(/^[0-9]{11}$/,{message:"phone number must be 11 digit"})
        phone:number;
        @IsIn(['male','female','others'])
        gender:string;
        
    }