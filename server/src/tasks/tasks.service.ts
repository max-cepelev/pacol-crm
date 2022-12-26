import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

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

  async remove(id: number) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
