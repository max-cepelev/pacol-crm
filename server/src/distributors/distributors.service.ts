import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DistributorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.DistributorUncheckedCreateInput) {
    return await this.prisma.distributor.create({ data });
  }

  async findAll() {
    return await this.prisma.distributor.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.distributor.findUnique({
      where: { id },
      include: { clients: true, projects: true, tasks: true },
    });
  }

  async update(id: number, data: Prisma.DistributorUncheckedUpdateInput) {
    return await this.prisma.distributor.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.distributor.delete({ where: { id } });
  }
}
