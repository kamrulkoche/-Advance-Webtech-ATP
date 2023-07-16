import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class ProductForm {


    @IsNotEmpty()
    name: string;

    // @IsEmail()
    // email: string;

    // @Length(3, 8)
    // password: string;


    // address: string;

    employeeid: number;



}

export class UpdateProductForm {


    @IsNotEmpty()
    name: string;

   
    employeeid: number;
    


}