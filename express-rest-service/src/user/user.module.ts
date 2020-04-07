import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [TaskModule, TaskService]
})
export class UserModule { }
