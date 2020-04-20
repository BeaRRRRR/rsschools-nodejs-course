import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

    create(user: CreateUserDto): Promise<UserModel> {
        return this.userModel.create(user);
    }

    deleteById(id: string) {
        this.userModel.findByIdAndRemove(id).orFail(new EntityNotFoundError()).exec();
    }

    update(id: string, newUser: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, { ...newUser }).orFail(new EntityNotFoundError()).exec();
    }
}
