import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        discount: data.discount,
        startDate: data.startDate,
        finishDate: data.finishDate,
        statusId: data.statusId,
        distributorId: data.distributorId,
        clientId: data.clientId,
        groupId: data.groupId,
      },
    });
  }

  async findAll({
    distributorId,
    clientId,
    groupId,
    statusId,
  }: {
    distributorId?: number;
    clientId?: number;
    groupId?: number;
    statusId?: number;
  }) {
    return await this.prisma.project.findMany({
      where: { distributorId, clientId, groupId, statusId },
      include: {
        status: true,
        distributor: { select: { name: true } },
        client: { select: { name: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProjectUncheckedUpdateInput) {
    return await this.prisma.project.update({
      data: {
        name: data.name,
        description: data.description,
        discount: data.discount,
        startDate: data.startDate,
        finishDate: data.finishDate,
        statusId: data.statusId,
        distributorId: data.distributorId,
        clientId: data.clientId,
        groupId: data.groupId,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.project.delete({ where: { id } });
  }
}
