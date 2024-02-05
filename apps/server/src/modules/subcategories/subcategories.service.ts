import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SubcategoryUncheckedCreateInput) {
    return await this.prisma.subcategory.create({ data });
  }

  async findAll(categoryId?: number) {
    return await this.prisma.subcategory.findMany({ where: { categoryId } });
  }

  async findOne(id: number) {
    return await this.prisma.subcategory.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SubcategoryUncheckedUpdateInput) {
    return await this.prisma.subcategory.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.subcategory.delete({ where: { id } });
  }
}
