import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SaleContentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SaleContentUncheckedCreateInput) {
    return await this.prisma.saleContent.create({ data });
  }

  async findAll() {
    return await this.prisma.saleContent.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.saleContent.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SaleContentUncheckedUpdateInput) {
    return await this.prisma.saleContent.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.saleContent.delete({ where: { id } });
  }
}
