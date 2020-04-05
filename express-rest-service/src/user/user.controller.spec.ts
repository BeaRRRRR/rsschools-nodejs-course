import { Test, TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('User Controller', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of users', () => {
            const result: GetUserDto[] = [{
                id: v4(),
                name: 'test',
                login: 'test',
            }];

            // Substituting whatever findAll methods returns for result
            jest.spyOn(service, 'findAll').mockImplementation(() => result)

            expect(controller.findAll()).toBe(result)
        });
    });

    describe('create', () => {
        it('should create a user', () => {
            const createUserDto: CreateUserDto = {
                name: 'test',
                login: 'test',
                password: 'test'
            }

        })
    })
});
