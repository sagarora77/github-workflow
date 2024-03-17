import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly _databaseService: DatabaseService) {}
  
  async create(createUserDto:  Prisma.UserCreateInput) {
    return this._databaseService.user.create({
      data: createUserDto
    })
  }

  async findAll(role?: 'ADMIN' | 'AGENT' | 'CLIENT') {
    if(role) return this._databaseService.user.findMany({
      where: {
        role,
      }
    })
    return this._databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this._databaseService.user.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this._databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto
    })
  }

  async  remove(id: number) {
    return this._databaseService.user.delete({
      where: {
        id,
      }
    })
  }
}
