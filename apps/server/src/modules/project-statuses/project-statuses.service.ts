import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProjectStatusesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectStatusUncheckedCreateInput) {
    return await this.prisma.projectStatus.create({ data });
  }

  async findAll() {
    return await this.prisma.projectStatus.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.projectStatus.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProjectStatusUncheckedUpdateInput) {
    return await this.prisma.projectStatus.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.projectStatus.delete({ where: { id } });
  }
}
