import { Injectable, NotFoundException } from '@nestjs/common'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    private users:CreateUserDto[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            role: 'AGENT'
        },
        {
            id: 3,
            name: 'Jim Smith',
            email: 'jim.smith@example.com',
            role: 'CLIENT'
        }
    ];
    findAll(role?: string) {
        if(role) {
            const roleArray = this.users.filter(user=> user.role === role);
            if(roleArray.length ===0) throw new NotFoundException(
                'User role not found'
            )
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user=> user.id === id);
        if(!user) throw new NotFoundException('No User Found');
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const userID = [...this.users].sort((a,b)=> b.id - a.id);
        const newUser = {
            id: userID[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser); 
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user=> {
            if(user.id === id) {
                return {...user, ...updateUserDto };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user=> user.id !== id);
        return removedUser;   
    }
}
