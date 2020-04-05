import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';

@Module({
    controllers: [BoardController],
    providers: [BoardService],
    imports: [TaskService, TaskModule]
})
export class BoardModule { }
