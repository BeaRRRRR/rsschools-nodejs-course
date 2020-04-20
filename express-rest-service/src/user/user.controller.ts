import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Header } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto, CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/')
    findAll(): Promise<GetUserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id): Promise<GetUserDto> {
        return this.userService.findById(id);
    }

    @Post()
    @HttpCode(200)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        this.userService.deleteById(id);
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

}
