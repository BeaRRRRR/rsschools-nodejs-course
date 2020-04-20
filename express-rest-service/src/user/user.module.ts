import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema'
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    imports: [TaskModule, TaskService, MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
})
export class UserModule { }
