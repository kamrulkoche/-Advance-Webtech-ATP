import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './userform.dto';

@Controller('admin')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/addinfo')
  addinfo(@Body() user: UserDTO,): any {
      return this.usersService.addinfo(user);
  }


}
