import { Catch, Delete, HttpException, HttpStatus, ParseIntPipe, Session, UnauthorizedException, UseGuards } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { Body, Patch, Param, Post, Put, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import session from "express-session";
import { diskStorage, MulterError } from "multer";
import { MechanicDTO, MechanicLoginDTO, MechanicUpdateDTO, MechanicUpdatePassDTO } from "./mechanic.DTO";
import { MechanicService } from "./mechanic.service";
import { SessionGuard } from "./session.guard";
import { chatwithadmin } from "./mechanic.entity";




@Controller('mechanic')
export class MechanicsController {
    constructor(private readonly mechanicService: MechanicService) { }

    //////////////////////////////////////////////////////////////////////////////////////////////

    //Registration part start here

    @Post('registration')   
    @UsePipes(new ValidationPipe())
    addMechanic(@Body() data: MechanicDTO) {
        console.log(data);
        //console.log(profileobj.filename);
       // data.photo = profileobj.filename;
        return this.mechanicService.mechanicRegistration(data);
    }

  

    

    @Post('chatwithadmin')
    async chatWithCustomer( @Body() data: chatwithadmin): Promise<any> {
        //const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.chatWithCustomer(data);
    }

   

    @Get('/chatwithadmin/:id')
    getAdminByProductID(@Param('id', ParseIntPipe) id: number): any {
        return this.mechanicService.getMechanicChat(id);
    }



    @Get('/getchatwithmechanic/:id')

    getMechanicChatwithadmin(@Param('id', ParseIntPipe) id: number): any {

    return  this.mechanicService.getadminChat(id);
    }
}