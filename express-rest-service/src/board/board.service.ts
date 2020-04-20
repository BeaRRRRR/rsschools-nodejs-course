import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { TaskService } from '../task/task.service';
import { Board } from './intefraces';
import { GetBoardDto, CreateBoardDto, UpdateBoardDto } from './dto';

@Injectable()
export class BoardService {
    constructor(
        private readonly boardRepository: BoardRepository,
        private readonly taskService: TaskService
    ) { }

    async findAll(): Promise<GetBoardDto[]> {
        const boards = await this.boardRepository.findAll();
        return boards.map(({ _id, title, columns }) => ({ id: _id, title, columns }))
    }

    async findById(id: string): Promise<GetBoardDto> {
        const { _id, title, columns } = await this.boardRepository.findById(id);
        return { id: _id, title, columns };
    }

    async create(createBoardDto: CreateBoardDto): Promise<GetBoardDto> {
        const { _id, title, columns } = await this.boardRepository.create(createBoardDto);
        return { id: _id, title, columns };
    }

    deleteById(id: string): void {
        this.boardRepository.deleteById(id);
        this.taskService.deleteAllByBoardId(id);
    }

    async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
        const { _id, title, columns } = await this.boardRepository.update(id, updateBoardDto);
        return { id: _id, title, columns };
    }
}
