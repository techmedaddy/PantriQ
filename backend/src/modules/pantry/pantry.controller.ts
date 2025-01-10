import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PantryService } from './pantry.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('pantry')
export class PantryController {
  constructor(private readonly pantryService: PantryService) {}

  @Post('tasks')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.pantryService.createTask(createTaskDto);
  }

  @Get('tasks')
  async findAllTasks() {
    return await this.pantryService.findAllTasks();
  }

  @Get('tasks/:id')
  async findTaskById(@Param('id') id: string) {
    return await this.pantryService.findTaskById(id);
  }

  @Patch('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.pantryService.updateTask(id, updateTaskDto);
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string) {
    return await this.pantryService.deleteTask(id);
  }
}
