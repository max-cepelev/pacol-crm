import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SaleUncheckedCreateInput) {
    return await this.prisma.sale.create({ data });
  }

  async findAll() {
    return await this.prisma.sale.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.sale.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.SaleUncheckedUpdateInput) {
    return await this.prisma.sale.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.sale.delete({ where: { id } });
  }
}
