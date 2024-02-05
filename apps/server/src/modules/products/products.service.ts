import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        video: data.video,
        instruction: data.instruction,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
      },
    });
  }

  async findAll({
    categoryId,
    subcategoryId,
  }: {
    categoryId?: number;
    subcategoryId?: number;
  }) {
    return await this.prisma.product.findMany({
      where: { categoryId, subcategoryId },
      include: { category: true, subcategory: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ProductUncheckedUpdateInput) {
    return await this.prisma.product.update({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        video: data.video,
        instruction: data.instruction,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({ where: { id } });
  }
}
