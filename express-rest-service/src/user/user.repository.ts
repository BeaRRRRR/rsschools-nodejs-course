import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { User } from './intefraces';

@Injectable()
export class UserRepository {
    private readonly users: User[] = [
        {
            id: v4(),
            name: 'mock',
            login: 'mock',
            password: 'mock'
        },
    ];

    findAll(): User[] {
        return this.users;
    }

    findById(id: string): User {
        const user: User | undefined = this.users.find(user => user.id === id);
        if (!user) throw new EntityNotFoundError('The user does not exist');
        return user;
    }

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    deleteById(id: string) {
        const user: User | undefined = this.findById(id);
        if (!user) throw new EntityNotFoundError('The user does not exist');
        this.users.splice(this.users.indexOf(user), 1);
    }

    update(oldUser: User, newUser: User) {
        this.users.splice(this.users.indexOf(oldUser), 1, newUser);
    }
}
