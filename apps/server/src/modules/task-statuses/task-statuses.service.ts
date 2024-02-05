import { Injectable } from '@nestjs/common';
import { Prisma, TaskStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TaskStatusesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskStatusUncheckedCreateInput) {
    return await this.prisma.taskStatus.create({ data });
  }

  async findAll({
    distributorId,
    userId,
  }: {
    distributorId?: number;
    userId?: number;
  }) {
    return await this.prisma.taskStatus.findMany({
      orderBy: { id: 'asc' },
      include: {
        tasks: {
          where: { distributorId, userId },
          include: {
            user: { select: { name: true } },
            client: { select: { name: true } },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.taskStatus.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TaskStatusUncheckedUpdateInput) {
    return await this.prisma.taskStatus.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.taskStatus.delete({ where: { id } });
  }
}
