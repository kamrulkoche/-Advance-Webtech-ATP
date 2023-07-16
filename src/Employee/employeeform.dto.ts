import {IsDate,IsEmail,IsNotEmpty,IsPhoneNumber,IsString,Length,Matches,} from 'class-validator';

// ------------------- EmployeeDTO Routes [Start] ---------------------//
export class EmployeeDTO {
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

  @IsEmail({}, { message: "invalid email" })
    email: string;

  // @IsNotEmpty({message:"Phone number is Empty"})
  // @Matches( /^[0-9]+$/, {message:"Phone Number error enter a proper name"})
  // @Length(0,11)
    phone: number;
    password: string;
    filename:string;

  // @IsDate({message:"Birthday Error"})
  // @IsNotEmpty({message:"Age Empty"})
  // birthday:string;

  // @IsEmail()
  // @IsNotEmpty({message:"Email is Empty"})
  // @Length(3,100)
  // email:string;

  // @IsNotEmpty({message:"Phone number is Empty"})
  // @Matches( /^[0-9]+$/, {message:"Phone Number error enter a proper name"})
  // @Length(1,11)
  // phone:number;

  // @IsNotEmpty({message:"Address Empty"})
  // @IsString({message:" Address is no string"})
  // address:string;

  // @IsNotEmpty({message:"Username is Empty"})
  // @IsString({message:"Username is no string"})
  // @Matches( /^[a-zA-Z]+$/, {message:"Username  error enter a proper name"})
  // username:string;

  // @IsNotEmpty({message:"Password Empty"})
  // @IsString({message:" Password is no string"})
  // password:string;

  // @IsNotEmpty({message:"Password Empty"})
  // @IsString({message:" Password is no string"})
  // confirmpassword:string;
}
// ------------------- EmployeeDTO Routes [End] ---------------------//

export class EmployeeUpdateDTO {
  id: number;
  @IsNotEmpty({ message: 'First Name Empty' })
  @IsString({ message: 'First name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name error enter a proper name' })
  fname: string;

  // @IsNotEmpty({message:"Last Name Empty"})
  // @IsString({message:"Last Name is no string"})
  // @Matches( /^[a-zA-Z]+$/, {message:"Last name error enter a proper name"})
  // lname:string;

  // @IsNotEmpty({message:"Gender is Empty"})
  // @IsString({message:"Gender is no string"})
  // @Matches( /^[a-zA-Z]+$/, {message:"Gender  error enter a proper name"})
  // gender:string;


  // @IsNotEmpty({message:"Phone number is Empty"})
  // //@Matches( /^[0-9]+$/, {message:"Phone Number error enter a proper name"})
  // //@Length(0,11)
  // phone:number;

  // @IsNotEmpty({message:"Age Empty"})
  // birthday:string;

  // @IsNotEmpty({message:"Address Empty"})
  // @IsString({message:" Address is no string"})
  // address:string;

  // @IsNotEmpty({message:"Username is Empty"})
  // @IsString({message:"Username is no string"})
  // @Matches( /^[a-zA-Z]+$/, {message:"Username  error enter a proper name"})
  // username:string;

  // @IsNotEmpty({message:"Password Empty"})
  // @IsString({message:" Password is no string"})
  // password:string;

  // @IsNotEmpty({message:"Password Empty"})
  // @IsString({message:" Password is no string"})
  // confirmpassword:string;
}

export class EmployeeProfiledeleteDTO {}

export class viewrecordDTO {}

export class AddProductDTO {
  @IsNotEmpty({ message: 'Product Name a Empty' })
  //@IsString({message:"Product name is no string"})
  // @Matches( /^[a-zA-Z]+$/, {message:"Product name error enter a proper name"})
  pname: string;

  @IsNotEmpty({ message: 'Price is Empty' })
  @Matches(/^[0-9]+$/, { message: 'Price a error enter a proper name' })
  pprice: string;
}

export class UpdateProductDTO {
  @IsNotEmpty({ message: 'Product Name Empty' })
  pname: string;

  @IsNotEmpty({ message: 'Price is Empty' })
  @Matches(/^[0-9]+$/, { message: 'Price  error enter a proper name' })
  pprice: string;
}

export class DeleteproductDTO {}

export class AdminmessageDTO {
  adminmessage: string;
}




export class EmployeeLoginDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  }
  