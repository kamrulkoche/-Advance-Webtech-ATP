import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './userform.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile'] });
  }



  addinfo(mydto: UserDTO): any {
    return this.usersRepository.save(mydto);
  }

  
  }


  

