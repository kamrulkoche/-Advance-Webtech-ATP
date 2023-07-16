import { Get, UseGuards } from "@nestjs/common";
import { Body, Controller, HttpException, HttpStatus, Post, Session, UsePipes, ValidationPipe } from "@nestjs/common";
import session from "express-session";
import { CustomerDTO, CustomerLoginDTO } from "./customer.DTO";
import { chatwithmechanic, CustomerEntity } from "./customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerSessionGuard } from "./customersession.guard";



@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    async addCustomer(@Body() data: CustomerDTO): Promise<CustomerEntity> {
        const checkemail = await this.customerService.checkEmail(data.email);
        if (checkemail != null) {
            throw new HttpException('Email already exist', HttpStatus.CONFLICT);
        }
        else {
            return this.customerService.addCustomer(data);
        }
        
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async mechanicLogin(@Session() session, @Body() data: CustomerLoginDTO) {
        try {
            const login = await this.customerService.customerLogin(data);
            if (login == true) {
                session.email = data.email;
                console.log(session.email);
                return "Welcome " + (session.email);
            }
            else {
                return "Wrong Password";
            }
        }
        catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Mechanic does not exist',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }

    @Get('profile')
    @UseGuards(CustomerSessionGuard)
    getProfile(@Session() session): Promise<any> {
        return this.customerService.getProfile(session.email);
    }



    @Post('chatwithmechanic')
    @UseGuards(CustomerSessionGuard)
    async chatWithMechanic(@Session() session, @Body() data: chatwithmechanic): Promise<any> {
        const profile = await this.customerService.getProfile(session.email);
        return this.customerService.chatWithMechanic(profile.id,data);
    }

    @Get('chatwithmechanic')
    @UseGuards(CustomerSessionGuard)
    async getCustomerChat(@Session() session) {
        const profile = await this.customerService.getProfile(session.email);
        return this.customerService.getCustomerChat(profile.id);
    }

    @Get('chatwithcustomer')
    @UseGuards(CustomerSessionGuard)
    async getMechanicChat(@Session() session) {
        const profile = await this.customerService.getProfile(session.email);
        return this.customerService.getMechanicChat(profile.id);
    }
}