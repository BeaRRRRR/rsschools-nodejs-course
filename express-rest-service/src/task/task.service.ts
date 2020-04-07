import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EntityNotFoundError } from '../errors/EntityNotFoundError';
import { Task } from './intefraces/task.interface';
import { GetTaskDto, CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
    private readonly tasks: Task[] = [];

    findAllByBoardId(boardId: string): GetTaskDto[] {
        return this.tasks.filter(task => task.boardId === boardId);
    }

    findById(id: string): GetTaskDto {
        const task: Task | undefined = this.tasks.find(task => task.id === id);
        if (!task) throw new EntityNotFoundError('The task does not exist');
        return task;
    }

    create(createTaskDto: CreateTaskDto, boardId: string) {
        const task: Task = { id: v4(), ...createTaskDto, boardId }
        this.tasks.push(task)
        return task;
    }

    deleteAllByBoardId(boardId: string) {
        this.tasks
            .filter(task => task.boardId === boardId)
            .forEach(task => this.tasks.splice(this.tasks.indexOf(task), 1));
    }

    unassignUserFromAllById(userId: string) {
        this.tasks
            .filter(task => task.userId === userId)
            .forEach(task => task.userId = null);
    }

    deleteById(id: string) {
        // TODO: think of how to call findById() and get the task we need instead of just copying its code
        const task: Task | undefined = this.tasks.find(task => task.id === id);
        if (!task) throw new EntityNotFoundError('The task does not exist');
        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    update(id: string, updateTaskDto: UpdateTaskDto) {
        const task: Task | undefined = this.tasks.find(task => task.id === id);
        if (!task) throw new EntityNotFoundError('The task does not exist');
        const updatedTask = { ...task, ...updateTaskDto };
        this.tasks.splice(this.tasks.indexOf(task), 1, updatedTask);
        return updatedTask;
    }


}
