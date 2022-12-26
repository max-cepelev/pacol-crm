import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PropertyUncheckedCreateInput) {
    return await this.prisma.property.create({ data });
  }

  async findAll() {
    return await this.prisma.property.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.property.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.PropertyUncheckedUpdateInput) {
    return await this.prisma.property.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.property.delete({ where: { id } });
  }
}
