import { IsNotEmpty, } from "class-validator";

export class newsDTO {


    @IsNotEmpty()
    message: string;

   
 
   



}

