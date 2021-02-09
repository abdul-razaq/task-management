import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: `task-${this.tasks.length + 1}`,
      title,
      description,
      createdOn: new Date(Date.now()).toUTCString(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    // it is a good practice to return the newly created resource in a REST API.
    return task;
  }
}
