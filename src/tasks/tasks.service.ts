import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./create-task.dto";
import { getTasksFilterDto } from "./get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search))
          return true;
        return false;
      });
    }
    return tasks;
  }
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id == id);
    if(!found){
      throw new NotFoundException(`Not Find any task with id:${id}`);
    } 
    return found;
  }
  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description } = CreateTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
