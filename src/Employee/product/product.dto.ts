import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class ProductForm {


    @IsNotEmpty({ message: 'product Name Empty' })
    name: string;

    @IsNotEmpty({ message: 'price Empty' })
    price: string;
    
    // @IsNotEmpty({ message: 'price Empty' })
    // employee: string;

    //@IsNotEmpty({ message: 'employeeid Empty' })
    employeeid: number;



}

export class UpdateProductForm {


    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: string;
    employeeid: number;
    


}