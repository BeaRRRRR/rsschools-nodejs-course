import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { BoardService } from './board.service';
import { GetBoardDto, CreateBoardDto, UpdateBoardDto } from './dto';

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) { }

    @Get()
    findAll(): GetBoardDto[] {
        return this.boardService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): GetBoardDto {
        return this.boardService.findById(id);
    }

    @Post()
    @HttpCode(200)
    create(@Body() createUserDto: CreateBoardDto) {
        return this.boardService.create(createUserDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        this.boardService.deleteById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateBoardDto) {
        return this.boardService.update(id, updateUserDto);
    }

}
