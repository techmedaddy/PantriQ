import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class PantryService {
  private tasks: { id: number; title: string; description: string; status: string }[] = []; // Temporary in-memory storage (replace with a database)

  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = { id: this.tasks.length + 1, title: createTaskDto.title, description: createTaskDto.description, status: 'Pending' };
    this.tasks.push(newTask);
    return newTask;
  }

  async findAllTasks() {
    return this.tasks;
  }

  async findTaskById(id: string) {
    const task = this.tasks.find((t) => t.id === Number(id));
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === Number(id));
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateTaskDto };
    return this.tasks[taskIndex];
  }

  async deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === Number(id));
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const removedTask = this.tasks.splice(taskIndex, 1);
    return { message: `Task with ID ${id} deleted`, task: removedTask[0] };
  }
}
