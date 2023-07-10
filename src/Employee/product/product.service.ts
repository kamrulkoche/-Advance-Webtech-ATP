import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductForm, UpdateProductForm } from "./product.dto";
import { ProductEntity } from "./product.entity";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>,
      ) {}


    insertProduct(mydto:ProductForm):any {
    
   return this.productRepo.save(mydto);
      }
      getProductID(id):any {
        return this.productRepo.find({ 
                where: {id:id},
            relations: {
                employee: true,
            },
         });
    }




    getEmployeeByProductID(id):any {
        return this.productRepo.find({ 
                where: {id:id},
            relations: {
                employee: true,
            },
         });
    }




     // -------------------updateProductbyID Routes [Start] ---------------------//
  async updateProductbyID(
    id: number,
    data: UpdateProductForm,
  ): Promise<any> {
    return this.productRepo.update(id, data);
    //return this.managerRepo.findOneBy({ id });
  }
  // ------------------- updateProductbyID Routes [End] ---------------------//




}