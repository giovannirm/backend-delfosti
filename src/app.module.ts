import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { Seeder } from './seeder';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [TaskModule, UserModule, AuthModule, ProjectModule],
  controllers: [],
  providers: [
    PrismaClient,
    {
      provide: 'SEEDER',
      useFactory: async (prisma: PrismaClient) => {
        await Seeder.run();
      },
      inject: [PrismaClient],
    },
  ],
})
export class AppModule {}
