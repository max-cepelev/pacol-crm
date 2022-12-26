import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ContactUncheckedCreateInput) {
    return await this.prisma.contact.create({ data });
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ContactUncheckedUpdateInput) {
    return await this.prisma.contact.update({ data, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
