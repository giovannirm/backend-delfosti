import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { FindTasksDto } from './dto/find-tasks.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 200, description: 'Project created' })
  async create(@Body() data: Project, @Param('userId', ParseIntPipe) userId: number): Promise<Project> {
    const { name } = data
    return this.projectService.create(userId, name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Projects found' })
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200, description: 'Project found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Get('tasks/:id')
  @ApiOperation({ summary: 'Get a task by project id' })
  @ApiResponse({ status: 200, description: 'Task found for Project' })
  async findTasks(@Param('id', ParseIntPipe) id: number): Promise<FindTasksDto[]> {
    return this.projectService.findTasks(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Project): Promise<Project> {
    return this.projectService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a project' })
  @ApiResponse({ status: 200, description: 'Project removed' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.remove(id);
  }
}
