import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { UserRepository } from './user.repository';
import { TaskService } from '../task/task.service';
import { User } from './intefraces';
import { GetUserDto, CreateUserDto, UpdateUserDto } from './dto';

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
