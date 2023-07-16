import { ParseIntPipe,  } from "@nestjs/common";
import { Body, Param, Post, UsePipes, ValidationPipe, } from "@nestjs/common";
import { Controller, Get } from "@nestjs/common";
import { MechanicDTO} from "./mechanic.DTO";
import { MechanicService } from "./mechanic.service";
import { chatwithemployee } from "./mechanic.entity";




@Controller('mechanic')
export class MechanicsController {
    constructor(private readonly mechanicService: MechanicService) { }

   

    @Post('registration')   
    @UsePipes(new ValidationPipe())
    addMechanic(@Body() data: MechanicDTO) {
        console.log(data);
        //console.log(profileobj.filename);
       // data.photo = profileobj.filename;
        return this.mechanicService.mechanicRegistration(data);
    }

  

    

    @Post('chatwithemployee')
    async chatWithCustomer( @Body() data: chatwithemployee): Promise<any> {
        //const profile = await this.mechanicService.getProfile(session.email);
        return this.mechanicService.chatWithCustomer(data);
    }

    // @Get('/chatwithcustomer/:id')
    //  getMechanicChat(@Param("id")id) {
    //     return this.mechanicService.getMechanicChat(id);
    // }

    @Get('/chatwithemployee/:id')
    getEmployeeByProductID(@Param('id', ParseIntPipe) id: number): any {
        return this.mechanicService.getMechanicChat(id);
    }



    @Get('/getchatwithmechanic/:id')

    getMechanicChatwithemployee(@Param('id', ParseIntPipe) id: number): any {

    return  this.mechanicService.getemployeeChat(id);
    }
}