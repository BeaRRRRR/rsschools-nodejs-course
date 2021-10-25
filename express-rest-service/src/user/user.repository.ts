import { Model } from 'mongoose';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { UserModel } from './intefraces';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<UserModel>) { }

    findAll(): Promise<UserModel[]> {
        return this.userModel.find().exec();
    }

    findById(id: string): Promise<UserModel> {
        return this.userModel.findById(id).orFail(new EntityNotFoundError()).exec();
    }

    async findByLoginAndPassword(login: string, password: string): Promise<UserModel> {
        return this.userModel.findOne({ login, password }).orFail(new ForbiddenException()).exec();
    }

    async create(user: CreateUserDto): Promise<UserModel> {
        user.password = await bcrypt.hash(user.password, 10)
        return this.userModel.create(user);
    }

    deleteById(id: string) {
        this.userModel.findByIdAndRemove(id).orFail(new EntityNotFoundError()).exec();
    }

    update(id: string, newUser: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, { ...newUser }).orFail(new EntityNotFoundError()).exec();
    }
}
