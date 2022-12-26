import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryUncheckedCreateInput) {
    return await this.prisma.category.create({ data });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CategoryUncheckedUpdateInput) {
    return await this.prisma.category.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
