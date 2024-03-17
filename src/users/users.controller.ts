import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, Role  } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  private readonly logger = new LoggerService(UsersController.name);
  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this._usersService.create(createUserDto);
  }

  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for all Users\t${ip}`, UsersController.name)
    return this._usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this._usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._usersService.remove(+id);
  }
}
