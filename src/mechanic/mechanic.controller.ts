import { Catch, Delete, HttpException, HttpStatus, ParseIntPipe, Session, UnauthorizedException, UseGuards } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { Body, Patch, Param, Post, Put, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { error } from "console";
import session from "express-session";
import { diskStorage, MulterError } from "multer";
import { AssignServiceDTO, MechanicDTO, MechanicLoginDTO, MechanicServiceDTO, MechanicUpdateDTO, MechanicUpdatePassDTO } from "./mechanic.DTO";
import { chatwithcustomer, MechanicEntity } from "./mechanic.entity";
import { MechanicService } from "./mechanic.service";
import { SessionGuard } from "./session.guard";




@Controller('mechanic')
export class MechanicsController {
    constructor(private readonly mechanicService: MechanicService) { }

    //////////////////////////// Registration part start here ///////////////////////////////////

    //Registration part start here

    @Post('registration')
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
    @UsePipes(new ValidationPipe())
    async addMechanic(@Body() data, @Body() profile, @UploadedFile() profileobj: Express.Multer.File) {
        const checkemail = await this.mechanicService.checkEmail(data.mechanic_email);
        const checknid = await this.mechanicService.checkNid(data.mechanic_nid);
        const checkphone = await this.mechanicService.checkPhone(data.mechanic_phone);
        if (checkemail != null) {
            throw new HttpException('Email already exist', HttpStatus.CONFLICT);
        }
        if (checknid != null) {
            throw new HttpException('NID already exist', HttpStatus.CONFLICT);
        }
        if (checkphone != null) {
            throw new HttpException('Phone already exist', HttpStatus.CONFLICT);
        }
        else {
            console.log(data);
            console.log(profileobj.filename);
            data.photo = profileobj.filename;
            return this.mechanicService.mechanicRegistration(data, profile);
        }
        
    }

    //Registration part end here

    ///////////////////////////////// Registration part end here /////////////////////////////////


    ///////////////////////////////// Login part start here //////////////////////////////////////

    //Login part start here

    @Post('login')
    @UsePipes(new ValidationPipe())
    async mechanicLogin(@Session() session, @Body() data: MechanicLoginDTO) {
        try {
            const login = await this.mechanicService.mechanicLogin(data);
            if (login != true) {
                throw new HttpException('User doesnt exist. ', HttpStatus.NOT_FOUND);
            }
            else {
                session.email = data.mechanic_email;
                console.log("Welcome " + session.email);
                return ("Welcome " + session.email);
            }
        }
        catch (error) {
            throw new HttpException('Email or Password is incorrect. ', HttpStatus.NOT_FOUND);
        }
    }


    //Login part end here

    /////////////////////////////// Login part end here ///////////////////////////////////////

    ////////////////////////////// profile part start here ///////////////////////////////////

    //profile part start here


    //Get profile data
    @Get('profile')
    @UseGuards(SessionGuard)
    getProfile(@Session() session): Object {
        return this.mechanicService.getProfile(session.email);
    }


    //Get Profile picture
    @Get('profilepic')
    @UseGuards(SessionGuard)
    async getImages(@Session() session, @Res() res): Promise<any> {
        const profile = await this.mechanicService.getProfile(session.email);
        res.sendFile(profile.photo, { root: './profile' })
    }


    //Update profile data
    @Put('updateprofile')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async updateProfile(@Session() session, @Body() data: MechanicUpdateDTO) {
        const checkemail = await this.mechanicService.checkEmail(data.mechanic_email);
        const checkphone = await this.mechanicService.checkPhone(data.mechanic_phone);
        const profile = await this.mechanicService.getProfile(session.email);
        if (checkemail != null && data.mechanic_email != profile.mechanic_email) {
            throw new HttpException('Email already exist', HttpStatus.CONFLICT);
        }
        if (checkphone != null && data.mechanic_phone != profile.mechanic_phone) {
            throw new HttpException('Phone already exist', HttpStatus.CONFLICT);
        }
        else {
            return this.mechanicService.updateProfile(profile.mechanic_id, data);
        }
    }


    //update password
    @Patch('changepass')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    async updatePass(@Session() session, @Body() data: MechanicUpdatePassDTO): Promise<any>  {
        const profile = await this.mechanicService.getProfile(session.email);
        const oldpass = await this.mechanicService.verifyPassword(profile.mechanic_id, data);
        if (oldpass == true) {
            if (data.new_password != data.confirm_password) {
                throw new HttpException('New Password and confirm Password doesnt match', HttpStatus.NOT_ACCEPTABLE);
            }
            else {
                return this.mechanicService.changePassword(profile.mechanic_id, data.confirm_password);
            } 
        }
        else {
            throw new HttpException('Old Password doesnt match', HttpStatus.NOT_ACCEPTABLE);
        }
        
    }


    //delete mechanic profile
    @Delete("deleteprofile")
    @UseGuards(SessionGuard)
    async deleteMechanic(@Session() session) {
        const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.deleteProfile(profile.mechanic_id);
    }




    //profile part end here

    ////////////////////////// profile part start here ///////////////////////////////////////////////



    ////////////////////////// chat part start here /////////////////////////////////////////////////

    //chat part start here

    //send message to customer
    @Post('chatwithcustomer')
    @UseGuards(SessionGuard)
    async chatWithCustomer(@Session() session, @Body() data: chatwithcustomer): Promise<any> {
        const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.chatWithCustomer(profile.mechanic_id, data);
    }

    //Get message send by mechanic
    @Get('chatwithcustomer')
    @UseGuards(SessionGuard)
    async getMechanicChat(@Session() session) {
        const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.getMechanicChat(profile.mechanic_id);
    }


    //Get message send by Customer
    @Get('chatwithmechanic')
    @UseGuards(SessionGuard)
    async getCustomerChat(@Session() session) {
        const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.getCustomerChat(profile.mechanic_id);
    }
    

    ////////////////////////// chat part end here //////////////////////////////////////

    ///////////////////////// Service Part Start here///////////////////////////////////

    //Add services
    @Post('createservice')
    @UsePipes(new ValidationPipe())
    async createService(@Body() data: MechanicServiceDTO) {
        return this.mechanicService.createService(data);
    }


    /*@Post('addservice')
    @UseGuards(SessionGuard)
    async assignService(@Session() session, @Body() service_id): Promise<void> {
        return this.mechanicService.assignService(session.email, service_id);
    }*/



    //add Mechanic Service
    @Post('mechanicservice')
    @UseGuards(SessionGuard)
    async addMechanicService(@Session() session, @Body() data) {
        const id = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.addMechanicService(id.mechanic_id, data);
    }

    @Get('getservicebymechanicid')
    @UseGuards(SessionGuard)
    async getServiceByMechanicId(@Session() session) {
        const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.getServiceByMechanicId(profile.mechanic_id);  ``
    }


    @Get('searchservices')
    async getServiceByServiceType() {
        return this.mechanicService.getServiceByServiceType();
    }




    /////////////////////// Service part end here //////////////////////////////////////






















    @Post(('/document'))
    @UseInterceptors(FileInterceptor('document',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(pdf|docx)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 3000000 },
            storage: diskStorage({
                destination: './documents',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    uploadFiles(@UploadedFile() myfileobj: Express.Multer.File): object {
        console.log(myfileobj)
        return ({ message: "file uploaded" });
    }



    




    /*@Post(('/profilepic'))
      @UseInterceptors(FileInterceptor('profilepic',
          {
              fileFilter: (req, file, cb) => {
                  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                      cb(null, true);
                  else {
                      cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                  }
              },
              limits: { fileSize: 30000 },
              storage: diskStorage({
                  destination: './profilepics',
                  filename: function (req, file, cb) {
                      cb(null, Date.now() + file.originalname)
                  },
              })
          }
      ))
      uploadProfilePic(@UploadedFile() myfileobj: Express.Multer.File): object {
          console.log(myfileobj)
          return ({ message: "file uploaded" });
      }

      @Get('/showprofilepic/:name')
      getImages(@Param('name') name, @Res() res) {
          res.sendFile(name, { root: './uploads' })
      }*/
}