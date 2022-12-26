import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClientUncheckedCreateInput) {
    return await this.prisma.client.create({ data });
  }

  async findAll() {
    return await this.prisma.client.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.client.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ClientUncheckedUpdateInput) {
    return await this.prisma.client.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
