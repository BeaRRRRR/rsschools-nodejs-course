import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TaskService } from '../task/task.service';
import { GetUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { User } from './intefraces';


@Injectable()
export class UserService {
    constructor(
        private readonly taskService: TaskService,
        private readonly userRepository: UserRepository
    ) { }

    async findAll(): Promise<GetUserDto[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => {
            const { _id, name, login } = user;
            return { id: _id, name, login };
        })
    }

    async findById(id: string): Promise<GetUserDto> {
        const { _id, name, login } = await this.userRepository.findById(id);
        return { id: _id, name, login };
    }

    async findByLoginAndPassword(login: string, password: string): Promise<User> {
        return await this.userRepository.findByLoginAndPassword(login, password);
    }

    async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
        const { _id, name, login } = await this.userRepository.create(createUserDto);
        return { id: _id, name, login };
    }

    deleteById(id: string) {
        this.userRepository.deleteById(id);
        this.taskService.unassignUserFromAllById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
        const { _id, name, login } = await this.userRepository.update(id, updateUserDto);
        return { id: _id, name, login };
    }

}
