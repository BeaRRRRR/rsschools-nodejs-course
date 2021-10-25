import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { UpdateBoardDto, CreateBoardDto } from './dto';
import { BoardModel } from './intefraces';

@Injectable()
export class BoardRepository {
    constructor(@InjectModel('Board') private boardModel: Model<BoardModel>) { }

    findAll(): Promise<BoardModel[]> {
        return this.boardModel.find().exec();
    }

    findById(id: string): Promise<BoardModel> {
        return this.boardModel.findById(id).orFail(new EntityNotFoundError()).exec();
    }

    create(board: CreateBoardDto): Promise<BoardModel> {
        return this.boardModel.create(board);
    }

    deleteById(id: string): void {
        this.boardModel.findByIdAndRemove(id).orFail(new EntityNotFoundError()).exec();
    }

    update(id: string, newBoard: UpdateBoardDto): Promise<BoardModel> {
        return this.boardModel.findByIdAndUpdate(id, { ...newBoard }).orFail(new EntityNotFoundError()).exec();
    }
}
