import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.GroupUncheckedCreateInput) {
    return await this.prisma.group.create({ data });
  }

  async findAll() {
    return await this.prisma.group.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.group.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.GroupUncheckedUpdateInput) {
    return await this.prisma.group.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.group.delete({ where: { id } });
  }
}
