import { Body, Controller, Get, Param, Post, Delete, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, NotFoundException, Patch, ParseIntPipe, Res, } from '@nestjs/common';
import { EmployeeService } from './employeeservice.service';
import {
    AddProductDTO, AdminmessageDTO, DeleteproductDTO, EmployeeDTO, EmployeeUpdateDTO,
    UpdateProductDTO, viewrecordDTO,
} from './employeeform.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { EmployeeEntity } from './employee.entity';
import { ProductForm, UpdateProductForm } from './product/product.dto';
import { ProductService } from './product/product.service';


@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService, private productService: ProductService) { }

    // ------------------- Employee Registration Related Routes [Start] ---------------------//
    @Post('/registration')
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
            }),
        }),
    )
    signup(
        @UploadedFile() myfileobj: Express.Multer.File,
        @Body() data: EmployeeDTO,
    ): any {
        console.log(data);
        console.log(myfileobj.filename);
        data.filename = myfileobj.filename;
        return this.employeeService.employeeRegistration(data);
    }
    // ------------------- Employee Registration Related Routes [End] ---------------------//



    // ------------------- Employee Signin Related Routes [Start] ---------------------//
    @Post('/signin')
    signIn(@Body() data: EmployeeDTO) {
        return this.employeeService.signIn(data);
    }

    // ------------------- Employee Signin Related Routes [End] ---------------------//



    // ------------------- Employee all Registration Listshow Routes [Start] ---------------------//
    @Get('/registrationview')
    async findAll(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAll();
    }
    // ------------------- Employee all Registration Listshow Routes [End] ---------------------//


    // ------------------- Image name search  Routes [End] ---------------------//
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

    
    // ------------------- Employee Id Delete Routes [Start] ---------------------//
    @Delete('/users/:id')
    async delete(@Param('id') id: number): Promise<void> {
        const deleted = await this.employeeService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        } else {
            throw new NotFoundException(`User with ID ${id} successful`);
        }
    }
    // ------------------- Employee Id Delete Routes [End] ---------------------//


    // ------------------- Employee UpdateById Routes [Start] ---------------------//
    @Put('/updateemployee/:id')
    @UsePipes(new ValidationPipe())
    updateEmployeebyID(
        @Param() id: number,
        @Body() data: EmployeeUpdateDTO,
    ): object {
        return this.employeeService.updateEmployeeById(id, data);
    }
    // ------------------- Employee UpdateById Routes [End] ---------------------//



    // ------------------- addproduct  Routes [Start] ---------------------//
    @Post('/addproduct')
    @UsePipes(new ValidationPipe())
    insertProduct(@Body() productdto: ProductForm): any {
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
 

     //-------------------  deleteproductsbyemployee Routes [Start] ---------------------//
    @Delete('/deleteproductsbyemployee/:id')
    deleteProductByemployeeID(@Param('id', ParseIntPipe) id: number): any {
        return this.employeeService.deleteProductsByEmployeeID(id);
    }
    // ------------------- deleteproductsbyemployee Routes [End] ---------------------//



    // -------------------updateproductbyemployee Routes [Start] ---------------------//
    @Put('/updateproductbyemployee/:id')
    @UsePipes(new ValidationPipe())
    updateProductbyID(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductForm,
    ): object {
        return this.productService.updateProductbyID(id, data);
    }
    // -------------------updateproductbyemployee Routes [End] ---------------------//









}
