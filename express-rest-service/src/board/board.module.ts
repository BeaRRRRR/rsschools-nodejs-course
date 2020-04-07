import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';

@Module({
    controllers: [BoardController],
    providers: [BoardService, BoardRepository],
    imports: [TaskService, TaskModule]
})
export class BoardModule { }
