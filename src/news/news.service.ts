import { Injectable } from "@nestjs/common";
import { NewsEntity } from "./news.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { newsDTO } from "./news.dto";
import { Repository } from "typeorm";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepo: Repository<NewsEntity>,
  ) { }


 message(mydto: newsDTO): any {
    return this.newsRepo.save(mydto);
  }
  

   
   async findAll(): Promise<NewsEntity[]> {
    return this.newsRepo.find();
  }

  
}