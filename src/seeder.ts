import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export class Seeder {
  static async run() {
    const prisma = new PrismaClient();

    try {
      // Insertar datos de semillas aquí
      await prisma.role.createMany({
        data: [
          { id: 1, name: 'ADMINISTRATOR' },
          { id: 2, name: 'CUSTOMER' },
        ],
      });
      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      await prisma.module.createMany({
        data: [
          { id: 1, name: 'PROJECT' },
          { id: 2, name: 'TASK' },
        ],
      });
      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      await prisma.operation.createMany({
        data: [
          { id: 1, name: 'CREATE', moduleId: 1 },
          { id: 2, name: 'READ', moduleId: 1 },
          { id: 3, name: 'UPDATE', moduleId: 1 },
          { id: 4, name: 'DELETE', moduleId: 1 },
          { id: 5, name: 'CREATE', moduleId: 2 },
          { id: 6, name: 'READ', moduleId: 2 },
          { id: 7, name: 'UPDATE', moduleId: 2 },
          { id: 8, name: 'DELETE', moduleId: 2 },
          { id: 9, name: 'CHANGE ONLY STATE', moduleId: 2 },
        ],
      });
      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      await prisma.operationRole.createMany({
        data: [
          { roleId: 1, operationId: 1 },
          { roleId: 1, operationId: 2 },
          { roleId: 1, operationId: 3 },
          { roleId: 1, operationId: 4 },
          { roleId: 1, operationId: 5 },
          { roleId: 1, operationId: 6 },
          { roleId: 1, operationId: 7 },
          { roleId: 1, operationId: 8 },
          { roleId: 2, operationId: 2 },
          { roleId: 2, operationId: 6 },
          { roleId: 2, operationId: 9 },
        ],
      });
      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      const password = await bcrypt.hash('admin123', 10);
      await prisma.user.createMany({
        data: [
          {
            name: 'Administrator',
            email: 'admin@gmail.com',
            password,
            roleId: 1,
          },
        ],
      });

      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      await prisma.project.createMany({
        data: [
          { id: 1, name: 'Proyecto Kanban', userId: 1 },
          { id: 2, name: 'Proyecto Trello', userId: 1 },
          { id: 3, name: 'Proyecto Jira', userId: 1 },
        ],
      });

      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }

    try {
      // Insertar datos de semillas aquí
      await prisma.task.createMany({
        data: [
          {
            title: 'Crear módulo de autenticación',
            description: 'Crear módulo de autenticación con JWT',
            projectId: 1,
            userId: 1,
            state: 'DONE',
          },
        ],
      });

      console.log('Seeds insertados correctamente');
    } catch (error) {
      console.error('Error al insertar seeds:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
