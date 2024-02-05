import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClientUncheckedCreateInput) {
    return await this.prisma.client.create({
      data: {
        name: data.name,
        fullName: data.fullName,
        legalAddress: data.legalAddress,
        actualAddress: data.actualAddress,
        inn: data.inn,
        kpp: data.kpp,
        ogrn: data.ogrn,
        manager: data.manager,
        website: data.website,
        phone: data.phone,
        email: data.email,
        info: data.info,
        distributorId: data.distributorId,
        groupId: data.groupId,
      },
    });
  }

  async findAll({
    distributorId,
    groupId,
  }: {
    distributorId?: number;
    groupId?: number;
  }) {
    return await this.prisma.client.findMany({
      include: { distributor: { select: { name: true } } },
      where: { distributorId, groupId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.client.findUnique({
      where: { id },
      include: {
        distributor: true,
        group: true,
        projects: true,
        tasks: true,
        contacts: true,
      },
    });
  }

  async update(id: number, data: UpdateClientDto) {
    const dto = new UpdateClientDto(data);
    return await this.prisma.client.update({
      data: dto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
