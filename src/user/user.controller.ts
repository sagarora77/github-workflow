import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller("user")
export class UserController {

    constructor(private readonly _userService: UserService) {}
  @Get()
  findAll(@Query('role') role?: string) {
    return this._userService.findAll(role);
  }

//   @Get("interns")
//   findAllInterns() {
//     return [];
//   }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    if(id){
        return this._userService.findOne(id);
    }
    return [];
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this._userService.create(createUserDto);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this._userService.update(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number)  {
    return this._userService.delete(id);
  }

}
