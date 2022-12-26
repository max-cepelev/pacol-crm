import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CharacteristicsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CharacteristicUncheckedCreateInput) {
    return await this.prisma.characteristic.create({ data });
  }

  async findAll() {
    return await this.prisma.characteristic.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.characteristic.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CharacteristicUncheckedUpdateInput) {
    return await this.prisma.characteristic.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.characteristic.delete({ where: { id } });
  }
}
