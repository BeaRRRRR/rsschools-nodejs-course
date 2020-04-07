import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UserRepository } from './user.repository';
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
    constructor(
        private readonly taskService: TaskService,
        private readonly userRepository: UserRepository
    ) { }

    findAll(): GetUserDto[] {
        return this.userRepository.findAll().map(user => {
            // Deleting the password property using object descturing
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    findById(id: string): GetUserDto {
        const { password, ...userWithoutPassword } = this.userRepository.findById(id);
        return userWithoutPassword;
    }

    create(createUserDto: CreateUserDto) {
        // Not really sure if we should create the user with id there or in the repository
        const user: User = { id: v4(), ...createUserDto }
        const { password, ...userWithoutPassword } = this.userRepository.create(user);
        return userWithoutPassword;
    }

    deleteById(id: string) {
        this.userRepository.deleteById(id);
        this.taskService.unassignUserFromAllById(id);
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user: User = this.userRepository.findById(id);
        const updatedUser = { ...user, ...updateUserDto };
        this.userRepository.update(user, updatedUser);
        return updatedUser;
    }

}
