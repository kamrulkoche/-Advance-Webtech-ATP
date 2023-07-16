import { IsEmail, IsIn, IsNotEmpty, Matches } from "class-validator";


export class CustomerDTO {
    @Matches(/^[a-zA-Z][a-zA-Z\-\.\s]{2,150}$/, { message: "Only contain a-z or A-Z or dot(.) or dash(-) and must start with a letter and atleast 2 charecter" })
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    address: string;

    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/, { message: "Password Must contain one upper letter,lower letter,digit and special character" })
    password: string;

}


export class CustomerLoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}