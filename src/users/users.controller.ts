import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDTO } from './userform.dto';

@Controller('employee')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/addinfo')
  insertManager(@Body() user: UserDTO,): any {
      return this.usersService.insertManager(user);
  }


}
