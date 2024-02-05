import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskUncheckedCreateInput) {
    return await this.prisma.task.create({ data });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TaskUncheckedUpdateInput) {
    return await this.prisma.task.update({ data, where: { id } });
  }

  async updateMany(data: Prisma.TaskUncheckedCreateInput[]) {
    const tasks: Task[] = [];
    for (const task of data) {
      const {
        id,
        title,
        dateStarted,
        dateEnded,
        content,
        statusId,
        distributorId,
        clientId,
        projectId,
        userId,
        contactId,
      } = task;
      const response = id
        ? await this.update(id, {
            title,
            dateStarted,
            dateEnded,
            content,
            statusId,
            distributorId,
            clientId,
            projectId,
            userId,
            contactId,
          })
        : await this.create({
            title,
            dateStarted,
            dateEnded,
            content,
            statusId,
            distributorId,
            clientId,
            projectId,
            userId,
            contactId,
          });
      tasks.push(response);
    }
    return tasks;
  }

  async remove(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
