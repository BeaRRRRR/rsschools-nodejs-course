import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { TaskService } from '../task/task.service';
import { Board } from './intefraces/board.interface';
import { GetBoardDto, CreateBoardDto, UpdateBoardDto } from './dto';

@Injectable()
export class BoardService {
    private readonly boards: Board[] = [];

    constructor(private readonly taskService: TaskService) { }

    findAll(): GetBoardDto[] {
        return this.boards;
    }

    findById(id: string): GetBoardDto {
        const board: Board | undefined = this.boards.find(board => board.id === id);
        if (!board) throw new EntityNotFoundError('The board with this id does not exist')
        return board;
    }

    create(createBoardDto: CreateBoardDto) {
        const board: Board = { id: v4(), ...createBoardDto };
        this.boards.push(board);
        return board;
    }

    deleteById(id: string) {
        const board: Board | undefined = this.boards.find(board => board.id === id);
        if (!board) throw new EntityNotFoundError('The board with this id does not exist')
        this.boards.splice(this.boards.indexOf(board), 1);
        this.taskService.deleteAllByBoardId(id);
    }

    update(id: string, updateBoardDto: UpdateBoardDto) {
        const board: Board | undefined = this.boards.find(board => board.id === id);
        if (!board) throw new EntityNotFoundError('The board with this id does not exist')
        const updatedBoard = { ...board, ...updateBoardDto }
        this.boards.splice(this.boards.indexOf(board), 1, updatedBoard);
        return updatedBoard;
    }
}
