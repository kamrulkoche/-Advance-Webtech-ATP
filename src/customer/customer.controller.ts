import { Controller, Post, Body, Get, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards, Session, Res, Put, Delete, Param } from '@nestjs/common';
import { CustomerDto, loginDto, updateproDto } from './customer.dto';
import { CustomerService } from './customer.service';
import { userInfo } from 'os';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { SessionGuard } from './session.guard';
import session from 'express-session';

@Controller('customer')
export class CustomerController {
constructor(private readonly customerservice: CustomerService) {}

    @Post('registration')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('profile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 300000 },
            storage: diskStorage({
                destination: './profile',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    async customerReg(@Body() data:CustomerDto, @UploadedFile() profileobj: Express.Multer.File){
        const email = await this.customerservice.getEmail(data.email);
        if(email!=null){
            throw new HttpException('email already exist',HttpStatus.BAD_REQUEST)
        }
        else{
            data.profile = profileobj.filename;
            console.log(data);
            return this.customerservice.registrationCustomer(data);

        }

       
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Session() session,@Body() data:loginDto){
        const login = await this.customerservice.login(data);
        if(login==true){
            session.email = data.email;
            return "login successfully";
        }
        else{
            throw new HttpException('invalid Email or Passowrd',HttpStatus.BAD_REQUEST);
        }

    }

    

    @Get('/profile')
    @UseGuards(SessionGuard)
    async getprofile(@Session() session){
        return this.customerservice.getProfile(session.email);
    }

    @Get('/profilepicture')
    @UseGuards(SessionGuard)
    async getprofilepicture(@Session() session,@Res() res){
        const profile= await this.customerservice.getProfile(session.email);
        res.sendfile(profile.profile,{root:'./profile'});
    }
    
    @Put('/updateprofile')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateprofile(@Session() session,@Body() data:updateproDto){
        const getProfile= await this.customerservice.getProfile(session.email);
        return this.customerservice.updateProfile(getProfile.id,data);
    }

    @Delete('/deleteprofile')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async deleteProfile(@Session() session){
        const getProfile= await this.customerservice.getProfile(session.email);
        return this.customerservice.deleteProfile(getProfile.id);

    }

    @Post('/addproduct')
    async addProduct(@Body() data){
    return this.customerservice.addProduct(data);
    }

    @Get('/getproduct/:id')
    async getproduct(@Param() id){
        return this.customerservice.getProduct(id);

    }
    
    @Put('/updateproduct/:productid')
    async updateProduct(@Param() id,@Body() data){
        return this.customerservice.updateProduct(id,data);
    }

    @Delete('/deleteproduct')
    async deleteProduct(id){
        return this.customerservice.deleteProduct(id);
    }

    @Post('/addorder')
    async addorder(@Body() data){
        return this.customerservice.addOrder(data);
    } 
  
    @Get('/getorder/:orderid')
    async getOrder(@Param() id){
        return this.customerservice.getOrder(id);
    }

    @Put('/updateorder/:orderid')
    async updateOrder(@Param() id,@Body()data){
        return this.customerservice.updateOrder(id,data);
    }
    
    @Delete('/deleteorder')
    async deleteOrder(@Body() orderid){
        return this.customerservice.deleteOrder(orderid);
    }



    @Post('/addpayment')
    async addPayment(@Body() data){
        return this.customerservice.addPayment(data);
    } 

    


    





}
