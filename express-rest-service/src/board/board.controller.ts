import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { GetBoardDto, CreateBoardDto, UpdateBoardDto } from './dto';
import { AuthGuard } from '../auth.guard';

@Controller('boards')
@UseGuards(new AuthGuard())
export class BoardController {
    constructor(private boardService: BoardService) { }

    @Get()
    findAll(): Promise<GetBoardDto[]> {
        return this.boardService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<GetBoardDto> {
        return this.boardService.findById(id);
    }

    @Post()
    @HttpCode(200)
    create(@Body() createUserDto: CreateBoardDto): Promise<GetBoardDto> {
        return this.boardService.create(createUserDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        this.boardService.deleteById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateBoardDto): Promise<GetBoardDto> {
        return this.boardService.update(id, updateUserDto);
    }

}
