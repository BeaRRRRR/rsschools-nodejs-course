import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { Board } from './intefraces/board.interface';

@Injectable()
export class BoardRepository {
    private readonly boards: Board[] = [];

    findAll(): Board[] {
        return this.boards;
    }

    findById(id: string): Board {
        const board: Board | undefined = this.boards.find(board => board.id === id);
        if (!board) throw new EntityNotFoundError('The board with this id does not exist')
        return board;
    }

    create(board: Board) {
        this.boards.push(board)
    }

    deleteById(id: string) {
        const board: Board | undefined = this.boards.find(board => board.id === id);
        if (!board) throw new EntityNotFoundError('The board with this id does not exist')
        this.boards.splice(this.boards.indexOf(board), 1);
    }

    update(oldBoard: Board, newBoard: Board) {
        this.boards.splice(this.boards.indexOf(oldBoard), 1, newBoard);
    }
}
