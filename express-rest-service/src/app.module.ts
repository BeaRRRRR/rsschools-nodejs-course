import dotenv from 'dotenv';
import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { rootLogger } from './util/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { BoardModule } from './board/board.module';
import { LoggerMiddleware } from './logger.middleware';

dotenv.config();

@Module({
    imports: [
        UserModule,
        TaskModule,
        BoardModule,
        rootLogger,
        MongooseModule.forRoot(process.env.MONGODB_URL),
    ],

    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')

    }
}
