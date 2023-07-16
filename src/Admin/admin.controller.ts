import { Body, Controller, Get, Param, Post, Delete, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, NotFoundException, Patch, ParseIntPipe, Res, Session, UseGuards, UnauthorizedException, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ManagerForm, UpdateManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminService } from './adminservice.service';
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO, AdminUpdatePassDTO, AdminVarifyPassDTO, profileDTO, } from './adminform.dto';
import { AdminEntity, chatwithmechanic } from './admin.entity';
import { SessionGuard } from "./session.gaurd";
import { NewsService } from 'src/news/news.service';
import { newsDTO } from 'src/news/news.dto';
import { NewsEntity } from 'src/news/news.entity';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService, private managerService: ManagerService, private newsService: NewsService,) { }


    @Post('/signup')
    @UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 3000000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    signup(@Body() mydata: AdminDTO, @UploadedFile() imageobj: Express.Multer.File) {


        try {
            mydata.filename = imageobj.filename;
            return this.adminService.signup(mydata);
        }
        catch {
            // return "Email not found!";
            throw new UnauthorizedException("File not found!");
        }
    }

    @Post('/login')
    async signIn(@Body() data: AdminLoginDTO, @Session() session): Promise<any> {
        if (await this.adminService.signIn(data)) {
            session.email = data.email;
            return true;
        }
        else {

            return false;
        }
        // return this.adminService.signIn(data);
    }


    @Get('/logout')
    @UseGuards(SessionGuard)
    logout(@Session() session) {
        if (session.destroy())
            return { message: "Logged out successful" };

        else
            throw new UnauthorizedException("invalid actions");
    }


    // pin sent to email with smtp service
    @Post("/forgetPassword")
    @UsePipes(new ValidationPipe())
    forgetPassword(@Body() acc: any): any {
        return this.adminService.forgetPassword(acc);
    }

    // varify the varification pin and reset password (forgetpassword)
    @Patch("/varifyPass")
    varifyPass(@Body() admin: AdminVarifyPassDTO): any {
        return this.adminService.varifyPass(admin);
    }


    @Patch('/changepass')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe)
    async updatePass(@Session() session, @Body() data: AdminUpdatePassDTO): Promise<any> {
        const profile = await this.adminService.getProfile(session.email);
        const newpass = await this.adminService.verifyPassword(profile.id, data);
        if (newpass == true) {
            if (data.new_password != data.confirm_password) {
                return "New Password and confirm Password doesn't match";
            }
            else {
                return this.adminService.changePassword(profile.id, data.confirm_password);
            }
        }
        else {
            return "Old Password doesnt match";
        }

    }


    @Get('/profile')
    @UseGuards(SessionGuard)
    getProfile(@Session() session): Promise<any> {
        return this.adminService.getProfile(session.email);
    }


    // ------------------- Admin all Registration Listshow Routes [Start] ---------------------//
    @Get('/allregistrationview')
    @UseGuards(SessionGuard)
    async findAll(@Session() session): Promise<AdminEntity[]> {
        return this.adminService.findAll();
    }
    // ------------------- admin all Registration Listshow Routes [End] ---------------------//


    // ------------------- Image name search  Routes [End] ---------------------//
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }
    // ------------------- Image name search  Routes [End] ---------------------//



    // ------------------- Admin Id Search Routes [Start] ---------------------//
    @Get('/search/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.getAdminById(id);
    }
    // ------------------- Admin Id Search Routes [End] ---------------------//

    // ------------------- Admin Id Search By Name Routes [Start] ---------------------//
    @Get('/search')
    getAdminbyIDAndName(@Query() qry: any): object {
        return this.adminService.getAdminbyIDAndName(qry.id, qry.lname);
    }
    // ------------------- admin Id Search By Name Routes [End] ---------------------//


    // ------------------- admin Id Delete Routes [Start] ---------------------//
    @Delete('/users/:id')
    @UseGuards(SessionGuard)
    async delete(@Param('id') id: number, @Session() session): Promise<void> {
        const deleted = await this.adminService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        } else {
            throw new NotFoundException(`User with ID ${id} deleted successful`);
        }
    }
    // ------------------- admin Id Delete Routes [End] ---------------------//


    @Put('/updateadmin')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAdmin(@Body() data: AdminUpdateDTO, @Session() session): object {
        console.log(session.email);
        return this.adminService.updateAdmin(session.email, data);
    }


    // ------------------- admin UpdateById Routes [Start] ---------------------//
    @Put('/updateadmin/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param('id', ParseIntPipe) id: number, @Body() data: AdminUpdateDTO, @Session() session): any {
        return this.adminService.updateAdminById(id, data);
    }

    // ------------------- Admin UpdateById Routes [End] ---------------------//
    @Post('/addmanager')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    insertManager(@Body() managerdto: ManagerForm, @Session() session): any {
        return this.managerService.insertManager(managerdto);
    }



    @Get('/findmanagersbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.getManagersByAdminID(id);
    }


    // -------------------  FindAdminByManager Routes [Start] ---------------------//
    @Get('/findadminbymanager/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
        return this.managerService.getAdminByManagerID(id);
    }

    // ------------------- FindaAminByManager Routes [End] ---------------------//


    @Delete('/deletemanagersbyadmin/:id')
    @UseGuards(SessionGuard)
    deleteManagerByAdminID(@Param('id', ParseIntPipe) id: number, @Session() session): any {
        return this.adminService.deleteManagersByAdminID(id);
    }


    // -------------------updatemanagerprofilebyadmin Routes [Start] ---------------------//
    @Put('/updatemanagerprofilebyadmin/:id')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateManagerbyID(
        @Param('id', ParseIntPipe) id: number, @Body() data: UpdateManagerForm, @Session() session): object {
        return this.managerService.updateManagerbyID(id, data);
    }
    // -------------------updatemanagerprofilebyadmin Routes [End] ---------------------//



    @Post('/notice')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    news(@Body() updatenewsDTO: newsDTO, @Session() session): any {
        return this.newsService.message(updatenewsDTO);
    }



    @Get('/viewnotice')
    async findmessage(): Promise<NewsEntity[]> {
        console.log();
        return this.newsService.findAll();
    }


   

    @Post('chatwithmechanic')
    @UseGuards(SessionGuard)
    async chatWithMechanic(@Session() session, @Body() data: chatwithmechanic): Promise<any> {
        const profile = await this.adminService.getProfile(session.email);
        return this.adminService.chatWithMechanic(profile.id, data);
    }

   
    @Get('chatwithmechanic')
    @UseGuards(SessionGuard)
    async getCustomerChat(@Session() session) {
        const profile = await this.adminService.getProfile(session.email);
        return this.adminService.getCustomerChat(profile.id);
    }



    @Post('/addprofile')

    addprofile(@Body() Profile: profileDTO,): any {
        return this.adminService.addprofile(Profile);
    }

    @Get('/getProfileByUser/:id')
    getProfileByUser(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.getProfileByUser(id);
    }





}
