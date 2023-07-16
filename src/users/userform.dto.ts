import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {


    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

  


}