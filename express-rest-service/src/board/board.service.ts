import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { BoardRepository } from './board.repository';
import { TaskService } from '../task/task.service';
import { Board } from './intefraces/board.interface';
import { GetBoardDto, CreateBoardDto, UpdateBoardDto } from './dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly taskService: TaskService
    ) { }

    findAll(): GetBoardDto[] {
        return this.boardRepository.findAll();
    }

    findById(id: string): GetBoardDto {
        return this.boardRepository.findById(id);
    }

    create(createBoardDto: CreateBoardDto) {
        const board: Board = { id: v4(), ...createBoardDto };
        this.boardRepository.create(board);
        return board;
    }

    deleteById(id: string) {
        this.boardRepository.deleteById(id);
        this.taskService.deleteAllByBoardId(id);
    }

    update(id: string, updateBoardDto: UpdateBoardDto): Board {
        const board: Board = this.boardRepository.findById(id);
        const updatedBoard = { ...board, ...updateBoardDto }
        this.boardRepository.update(board, updatedBoard);
        return updatedBoard;
    }
}
