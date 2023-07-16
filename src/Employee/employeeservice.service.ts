import { Injectable } from '@nestjs/common';
import { EmployeeDTO, EmployeeLoginDTO, EmployeeUpdateDTO, } from './employeeform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './product/product.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(EmployeeEntity) private employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>
  ) { }


  // ------------------- Employee Registration Related Routes [Start] ---------------------//
  async employeeRegistration(data: EmployeeDTO): Promise<EmployeeEntity> {
    return this.employeeRepo.save(data);
  }
  // ------------------- Employee Registration Related Routes [End] ---------------------//



  // ------------------- Employee Id Search Routes [Start] ---------------------//
  async getEmployeeById(id: number): Promise<EmployeeEntity> {
    return this.employeeRepo.findOneBy({ id });
  }
  // ------------------- Employee Id Search Routes [End] ---------------------//



  // ------------------- Employee Id Search By Name Routes [Start] ---------------------//
  async getEmployeebyIDAndName(id, data): Promise<EmployeeEntity> {
    return this.employeeRepo.findOneBy({ id: id, lname: data });
  }
  // ------------------- Employee Id Search By Name Routes [End] ---------------------//



  // ------------------- Employee all Registration Listshow Routes [Start] ---------------------//
  async findAll(): Promise<EmployeeEntity[]> {
    return this.employeeRepo.find();
  }
  // ------------------- Employee all Registration Listshow Routes [End] ---------------------//



  // ------------------- Employee Id Delete Routes [Start] ---------------------//
  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.employeeRepo.delete(id);
    return deleteResult.affected > 0;
  }
  // ------------------- Employee Id Delete Routes [End] ---------------------//



  async updateEmployee(email: string, data: EmployeeUpdateDTO): Promise<EmployeeEntity> {
    await this.employeeRepo.update({ email: email }, data);
    return this.employeeRepo.findOneBy({ id: data.id });
  }




  // ------------------- Employee UpdateById Routes [Start] ---------------------//
  async updateEmployeeById(id: number,data: EmployeeUpdateDTO,): Promise<EmployeeEntity> {
    await this.employeeRepo.update(id, data);
    return this.employeeRepo.findOneBy({ id });
  }
  // ------------------- Employee UpdateById Routes [End] ---------------------//


  // ------------------- Employee signup Routes [Start] ---------------------//
  async signup(data: EmployeeDTO): Promise<EmployeeEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password,salt);
   return this.employeeRepo.save(data);
}
 // ------------------- Employee signup Routes [Start] ---------------------//


 // ------------------- Employee Signin Routes [Start] ---------------------//
 async signIn(data: EmployeeLoginDTO) {
  const userdata = await this.employeeRepo.findOneBy({ email: data.email });
  if (userdata) {
    const match: boolean = await bcrypt.compare(data.password, userdata.password);
    console.log(`${userdata} and ${match}`);
    return match;
  }
  else
    return false; 
}
// ------------------- findproductbyemployee Routes [Start] ---------------------//
getProductID(id): any {
  return this.employeeRepo.find({
    where: { id: id },
    relations: {
      products: true,
    },
  });
}
// ------------------- findproductbyemployee Routes [End] ---------------------//



// -------------------deleteManagersByAdminID Routes [Start] ---------------------//
async deleteProductsByEmployeeID(id): Promise<any> {
  // select * form manager where id = id
  const user = await this.productRepo.findOne({
    where: { id: id }
  });

  if (user) {

    this.productRepo.delete(id);
    return "Deleted this product"
  }
  else
    return { Failed: "Product not found!" }
}
// ------------------- deleteManagersByAdminID Routes [End] ---------------------//



}