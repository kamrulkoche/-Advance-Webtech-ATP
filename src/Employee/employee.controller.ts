import { Body, Controller, Get, Param, Post, Delete, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, NotFoundException, ParseIntPipe, Res, Session, UseGuards, UnauthorizedException, Patch, } from '@nestjs/common';
import { EmployeeService } from './employeeservice.service';
import { EmployeeDTO, EmployeeLoginDTO, EmployeeUpdateDTO, EmployeeUpdatePassDTO, EmployeeVarifyPassDTO, profileDTO, } from './employeeform.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { EmployeeEntity, chatwithmechanic } from './employee.entity';
import { ProductForm, UpdateProductForm } from './product/product.dto';
import { ProductService } from './product/product.service';
import { SessionGuard } from './session.gaurd';



@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private productService: ProductService) { }

    // ------------------- Employee Registration Related Routes [Start] ---------------------//
    @Post('/signup')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(
        FileInterceptor('filename', {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'filename'), false);
                }
            },
            limits: { fileSize: 5000000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                },
            })
        }
        ))

    @UsePipes(new ValidationPipe)
    signup(@Body() mydata: EmployeeDTO, @UploadedFile() imageobj: Express.Multer.File) {
        // console.log(mydata);
        // console.log(imageobj.filename);
        try {
            mydata.filename = imageobj.filename;
            return this.employeeService.signup(mydata);
        }
        catch {
            // return "Email not found!";
            throw new UnauthorizedException("Your Input has error");
        }
    }
    // ------------------- Employee Registration Related Routes [End] ---------------------//



    // ------------------- Employee Signin Related Routes [Start] ---------------------//
    @Post('/signin')
    @UsePipes(new ValidationPipe)
    async signIn(@Body() data: EmployeeLoginDTO, @Session() session): Promise<any> {
        if (await this.employeeService.signIn(data)) {
            session.email = data.email;
            return "Successfully login";
            //return true;
        }
        else {

            return "Incorrect Email or Password  ";
            //return false;
        }

    }
    // ------------------- Employee Signin Related Routes [End] ---------------------//



    // ------------------- Employee forgetPassword Routes [Start] ---------------------//
    // pin sent to email with smtp service
    @Post("/forgetPassword")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body() acc: any): any {
        return this.employeeService.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifyPass")
    varifyPass(@Body() employee: EmployeeVarifyPassDTO): any {
        return this.employeeService.varifyPass(employee);
    }
    // ------------------- Employee forgetPassword Routes [End] ---------------------//

    //update password
    @Patch('/changepass')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    async updatePass(@Session() session, @Body() data: EmployeeUpdatePassDTO): Promise<any> {
        const profile = await this.employeeService.getProfile(session.email);
        const newpass = await this.employeeService.verifyPassword(profile.id, data);
        if (newpass == true) {
            if (data.new_password != data.confirm_password) {
                return "New Password and confirm Password doesn't match";
            }
            else {
                return this.employeeService.changePassword(profile.id, data.confirm_password);
            }
        }
        else {
            return "Old Password doesnt match";
        }

    }


    // ------------------- Employee logout Related Routes [Start] ---------------------//
    @Get('/logout')
    @UseGuards(SessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }
    // ------------------- Employee logout Routes [End] ---------------------//



    @Get('profile')
    @UseGuards(SessionGuard)
    getProfile(@Session() session): Promise<any> {
        return this.employeeService.getProfile(session.email);
    }




    // ------------------- Employee all Registration Listshow Routes [Start] ---------------------//
    @Get('/registrationallview')
    async findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }
    // ------------------- Employee all Registration Listshow Routes [End] ---------------------//



    // ------------------- Image name search  Routes [Start] ---------------------//
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }
    // ------------------- Image name search  Routes [End] ---------------------//


    // ------------------- Employee Id Search Routes [Start] ---------------------//
    @Get('/search/:id')
    getEmployeeById(@Param('id', ParseIntPipe) id: number): object {
        return this.employeeService.getEmployeeById(id);
    }
    // ------------------- Employee Id Search Routes [End] ---------------------//


    // ------------------- Employee Id Search By Name Routes [Start] ---------------------//
    @Get('/search')
    getEmployeebyIDAndName(@Query() qry: any): object {
        return this.employeeService.getEmployeebyIDAndName(qry.id, qry.lname);
    }
    // ------------------- Employee Id Search By Name Routes [End] ---------------------//


    @Put('/updateadmin')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: EmployeeUpdateDTO, @Session() session): object {
        console.log(session.email);
        return this.employeeService.updateEmployee(session.email, data);
    }



    // ------------------- Employee updateemployeeById Routes [Start] ---------------------//
    @Put('/updateemployee/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param('id', ParseIntPipe) id: number, @Body() data: EmployeeUpdateDTO, @Session() session): any {
        return this.employeeService.updateEmployeeById(id, data);
    }
    // ------------------- Employee updateemployeeById Routes [End] ---------------------//



    // ------------------- Employee Id Delete Routes [Start] ---------------------//
    @Delete('/users/:id')
    @UseGuards(SessionGuard)
    async delete(@Param('id') id: number, @Session() session): Promise<void> {
        const deleted = await this.employeeService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        } else {
            throw new NotFoundException(`User with ID ${id} successful`);
        }
    }
    // ------------------- Employee Id Delete Routes [End] ---------------------//



    // ------------------- addproduct  Routes [Start] ---------------------//
    @Post('/addproduct')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertProduct(@Body() productdto: ProductForm, @Session() session): any {

        return this.productService.insertProduct(productdto);
    }



    // ------------------- addproduct Routes [End] ---------------------//


    // ------------------- findproductbyemployee Routes [Start] ---------------------//
    @Get('/findproductbyemployee/:id')
    getProductID(@Param('id', ParseIntPipe) id: number): any {
        return this.employeeService.getProductID(id);
    }
    // ------------------- findproductbyemployee Routes [End] ---------------------//



    // -------------------  findemployeebyproduct Routes [Start] ---------------------//
    @Get('/findemployeebyproduct/:id')
    getEmployeeByProductID(@Param('id', ParseIntPipe) id: number): any {
        return this.productService.getEmployeeByProductID(id);
    }

    // ------------------- findemployeebyproduct Routes [End] ---------------------//

    // -------------------updateproductbyemployee Routes [Start] ---------------------//
    @Put('/updateproductbyemployee/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateProductbyID(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductForm, @Session() session): object {
        return this.productService.updateProductbyID(id, data);
    }
    // -------------------updateproductbyemployee Routes [End] ---------------------//



    //-------------------  deleteproductsbyemployee Routes [Start] ---------------------//
    @Delete('/deleteproductsbyemployee/:id')
    @UseGuards(SessionGuard)
    deleteProductByemployeeID(@Param('id', ParseIntPipe) id: number, @Session() session): any {
        return this.employeeService.deleteProductsByEmployeeID(id);
    }
    // ------------------- deleteproductsbyemployee Routes [End] ---------------------//



    @Post('chatwithmechanic')
    @UseGuards(SessionGuard)
    async chatWithMechanic(@Session() session, @Body() data: chatwithmechanic): Promise<any> {

        try {
            const profile = await this.employeeService.getProfile(session.email);
            return this.employeeService.chatWithMechanic(profile.id, data);
        }
        catch {
            throw new UnauthorizedException("Error")
        }

    }

    @Get('chatwithmechanicfddf')
    @UseGuards(SessionGuard)
    async getCustomerChat(@Session() session) {
        const profile = await this.employeeService.getProfile(session.email);
        return this.employeeService.getCustomerChat(profile.id);
    }



    @Post('/addprofile')

    addprofile(@Body() Profile: profileDTO,): any {
        return this.employeeService.addprofile(Profile);
    }

    @Get('/getProfileByUser/:id')
    getProfileByUser(@Param('id', ParseIntPipe) id: number): any {
        return this.employeeService.getProfileByUser(id);
    }





}
