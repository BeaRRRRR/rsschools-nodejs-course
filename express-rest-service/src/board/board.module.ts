import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';
import { BoardSchema } from './schemas/board.schema';

@Module({
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
    imports: [TaskService, TaskModule,
        MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }])]
})
export class BoardModule { }
