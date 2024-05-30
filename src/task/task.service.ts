import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {

  constructor(private readonly prisma: PrismaService) {}

  async create(data: Task): Promise<Task> {
    return this.prisma.task.create({
      data
    });
  }

  async getByProjectId(id: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { projectId: id }
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id }
    });
  }

  async update(id: number, data: Partial<Task>): Promise<Task> {
    console.log(data);
    console.log(id);
    return this.prisma.task.update({
      where: { id },
      data
    });
  }

  async updateState(projectId: number, taskId: number, state: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: { id: taskId },
      data: state
    });
  }

  async remove(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id }
    });
  }
}
