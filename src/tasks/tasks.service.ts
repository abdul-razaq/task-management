import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // public getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  public async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task)
      throw new NotFoundException(`task with the ID of ${id} not found.`);
    return task;
  }

  // public deleteTask(id: string): void {
  //   const taskToDelete = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
  // }

  // public updateTaskStatus(id: string, status: TaskStatus): Task | string {
  //   const taskToUpdate = this.getTaskById(id);
  //   taskToUpdate.status = status;
  //   return taskToUpdate;
  // }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask: Task = new Task();
    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;

    await newTask.save();
    return newTask;
  }

  // public createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: `task-${this.tasks.length + 1}`,
  //     title,
  //     description,
  //     createdOn: new Date(Date.now()).toUTCString(),
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   // it is a good practice to return the newly created resource in a REST API.
  //   return task;
  // }
}
