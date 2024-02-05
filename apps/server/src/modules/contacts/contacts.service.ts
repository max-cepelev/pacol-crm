import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdateClientDto } from '~/modules/clients/dto/update-client.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ContactUncheckedCreateInput) {
    return await this.prisma.contact.create({ data });
  }

  async findAll({
    distributorId,
    clientId,
  }: {
    distributorId?: number;
    clientId?: number;
  }) {
    return await this.prisma.contact.findMany({
      where: { distributorId, clientId },
      include: { client: { select: { name: true } } },
    });
  }

  async findOne(id: number) {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateContactDto) {
    const dto = new UpdateContactDto(data);
    console.log({ ...dto });
    return await this.prisma.contact.update({ data: dto, where: { id } });
  }

  async remove(id: number) {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
