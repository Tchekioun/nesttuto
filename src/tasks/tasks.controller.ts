import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from "@nestjs/common";
import { CreateTaskDto } from "./create-task.dto";
import { getTasksFilterDto } from "./get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";
import { updateTaskDto } from "./update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasksWithFilters(@Query() filterDto: getTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: updateTaskDto
  ): Task {
    const {status} = updateTaskDto;
    return this.tasksService.updateTask(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
