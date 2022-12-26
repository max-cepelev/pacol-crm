import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    return await this.prisma.project.create({ data });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProjectUncheckedUpdateInput) {
    return await this.prisma.project.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.project.delete({ where: { id } });
  }
}
