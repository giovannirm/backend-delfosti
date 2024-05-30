import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
  imports: [PrismaModule]
})
export class ProjectModule {}
