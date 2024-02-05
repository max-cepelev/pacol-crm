import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class SaleStatusesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SaleStatusUncheckedCreateInput) {
    return await this.prisma.saleStatus.create({ data });
  }

  async findAll() {
    return await this.prisma.saleStatus.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.saleStatus.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SaleStatusUncheckedUpdateInput) {
    return await this.prisma.saleStatus.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.saleStatus.delete({ where: { id } });
  }
}
