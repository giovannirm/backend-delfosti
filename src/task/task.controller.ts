import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 200, description: 'Task created' })
  async create(@Body() data: Task): Promise<Task> {
    return this.taskService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Tasks found' })
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({ status: 200, description: 'Task found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Get('project/:id')
  @ApiOperation({ summary: 'Get tasks by project id' })
  @ApiResponse({ status: 200, description: 'Tasks found' })
  async getByProjectId(@Param('id', ParseIntPipe) id: number): Promise<Task[]> {
    return this.taskService.getByProjectId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Task>): Promise<Task> {
    return this.taskService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a task' })
  @ApiResponse({ status: 200, description: 'Task removed' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.remove(id);
  }

  @Patch('update-state/:id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task updated' })
  async updateState(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() state: Partial<Task>
  ): Promise<Task> {
    return this.taskService.updateState(projectId, taskId, state);
  }
}
