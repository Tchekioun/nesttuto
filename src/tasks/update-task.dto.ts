import { IsEnum } from "class-validator";
import { TaskStatus } from "./task.model";

export class updateTaskDto{
  @IsEnum(TaskStatus)
  status:TaskStatus;
}