import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TaskStatusesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskStatusUncheckedCreateInput) {
    return await this.prisma.taskStatus.create({ data });
  }

  async findAll() {
    return await this.prisma.taskStatus.findMany();
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
