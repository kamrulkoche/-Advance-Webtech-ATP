import {IsEmail, IsInt,IsNotEmpty,IsString,Length,Matches,} from 'class-validator';

// ------------------- AdminDTO Routes [Start] ---------------------//
export class AdminDTO {
  @IsNotEmpty({ message: 'First Name Empty' })
  @IsString({ message: 'First name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name error enter a proper name' })
  fname: string;

  @IsNotEmpty({ message: 'Last Name Empty' })
  @IsString({ message: 'Last Name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Last name error enter a proper name' })
  lname: string;

  @IsNotEmpty({message:"Gender is Empty"})
  @IsString({message:"Gender is no string"})
  @Matches( /^[a-zA-Z]+$/, {message:"Gender  error enter a proper name"})
  gender:string;

  @IsNotEmpty({message:"Phone number is Empty"})
  @Matches( /^[0-9]+$/, {message:"Phone Number error enter a proper name"})
  @Length(1,11)
  phone:string;

  @IsNotEmpty({message:"Password Empty"})
  @IsString({message:" Password is no string"})

  @IsNotEmpty({ message: 'password Empty' })
  password:string;
  
  filename:string;

}
// ------------------- AdminDTO Routes [End] ---------------------//

export class AdminUpdateDTO {
  id: number;
  @IsNotEmpty({ message: 'First Name Empty' })
  @IsString({ message: 'First name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name error enter a proper name' })
  fname: string;


}

export class AdminLoginDTO {
  //id: number;
  //name: string;
  @IsEmail()
  @IsNotEmpty({message:"Email is Empty"})
  @Length(3,100)
  email: string;

  @IsNotEmpty({ message: 'password Empty' })
  password: string;
  }
  

export class AdminVarifyPassDTO {
  @IsNotEmpty()
  @IsInt()
  pin: number;
  @IsNotEmpty()
  password: string
}



export class AdminUpdatePassDTO {
  @IsNotEmpty()
  password: string;
  //@Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/, { message: "Must contain one upper letter,lower letter,digit and special character" })
  new_password: string;
  @IsNotEmpty()
  confirm_password: string;

}

export class NewsDTO {
 
  @IsNotEmpty()
  message: string;
}

export class profileDTO {
  @IsNotEmpty()
  Name: string;
}