import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { TaskService } from '../task/task.service';
import { User } from './intefraces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/*
  Now most of the methods use the same code to find the user by id,
  and I can't call the findById() method instead, because it return 
  the user without password, which is not enough for my purposes.
  But I believe that this problem would be solved by the introduction of 
  a database and a repository layer, which will handle all the low-level logic
  and will provide method for finding the user by id.
*/

@Injectable()
export class UserService {
    private readonly users: User[] = [
        {
            id: v4(),
            name: 'mock',
            login: 'mock',
            password: 'mock'
        },
    ];

    constructor(private readonly taskService: TaskService) { }

    findAll(): GetUserDto[] {
        return this.users.map(user => {
            // Deleting the password property using object descturing
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    findById(id: string): GetUserDto {
        const user: User | undefined = this.users.find(user => user.id === id);
        if (!user) throw new EntityNotFoundError('The user does not exist');
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    create(createUserDto: CreateUserDto) {
        const user: User = { id: v4(), ...createUserDto }
        this.users.push(user)
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    deleteById(id: string) {
        // TODO: think of how to call findById() and get the user we need instead of just copying its code
        const user: User | undefined = this.users.find(user => user.id === id);
        if (!user) throw new EntityNotFoundError('The user does not exist');
        this.users.splice(this.users.indexOf(user), 1);
        this.taskService.unassignUserFromAllById(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user: User | undefined = this.users.find(user => user.id === id);
        if (!user) throw new EntityNotFoundError('The user does not exist');
        const updatedUser = { ...user, ...updateUserDto };
        this.users.splice(this.users.indexOf(user), 1, updatedUser);
        return updatedUser;
    }

}
