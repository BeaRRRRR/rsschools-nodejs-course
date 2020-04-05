import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { BoardModule } from './board/board.module';

@Module({
    imports: [UserModule, TaskModule, BoardModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
