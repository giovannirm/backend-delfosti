import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { MODULE, OPERATION, ROLES, TASK_STATUS } from 'src/constant';
import { FindTasksDto } from './dto/find-tasks.dto';

@Injectable()
export class ProjectService {
  // moduleId = MODULE.PROJECT

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, name: string): Promise<Project> {
    // const operation = OPERATION.CREATE
    const user = await this.userService.findOne(userId);

    const { roleId } = user

    // this.userService.checkPermission(operation, this.moduleId, roleId)

    if (roleId !== ROLES.ADMINISTRATOR) {
      throw new ForbiddenException('You are not authorized to create a project');
    }

    return this.prisma.project.create({
      data: {
        name,
        user: {
          connect: { id: userId }
        }
      }
    })
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project> {
    return this.prisma.project.findUnique({
      where: { id }
    });
  }

  async findTasks(id: number): Promise<FindTasksDto[]> {
    const project = await this.prisma.project.findUnique({
      where: { id }
    });

    const tasks = await this.prisma.task.findMany({
      where: { projectId: project.id }
    });

    const groupedTasks = tasks.reduce((acc, task) => {
      const { state } = task;
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(task);
      return acc;
    }, {});

    const findTasks = Object.keys(groupedTasks).map((key) => ({
      state: key,
      tasks: groupedTasks[key],
      position: TASK_STATUS[key].position
    }));

    // Order by position
    return findTasks.sort((a, b) => a.position - b.position);
  }

  async update(id: number, data: Project): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data
    });
  }

  async remove(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id }
    });
  }
}
