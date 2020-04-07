import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, Header } from '@nestjs/common';
import { TaskService } from './task.service';
import { GetTaskDto, CreateTaskDto, UpdateTaskDto } from './dto';


@Controller('boards/:boardId/tasks')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get('')
    findAllByBoardId(@Param('boardId') boardId: string): GetTaskDto[] {
        return this.taskService.findAllByBoardId(boardId);
    }

    @Get(':id')
    findById(@Param('id') id): GetTaskDto {
        return this.taskService.findById(id);
    }

    @Post()
    @HttpCode(200)
    create(@Body() createTaskDto: CreateTaskDto, @Param('boardId') boardId: string) {
        return this.taskService.create(createTaskDto, boardId);
    }

    @Delete(':id')
    deleteById(@Param('boardId') boardId: string, @Param('id') id: string) {
        this.taskService.deleteById(id);
    }

    @Put(':id')
    @Header('Content-Type', 'application/json')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }


}
