import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async findAll() {
    const users: Pick<
      User,
      | 'id'
      | 'name'
      | 'phone'
      | 'email'
      | 'activated'
      | 'description'
      | 'distributorId'
    >[] = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        activated: true,
        role: true,
        description: true,
        distributorId: true,
        distributor: true,
      },
      orderBy: { id: 'asc' },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        activated: true,
        role: true,
        distributorId: true,
        distributor: true,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        activated: true,
        role: true,
        password: true,
      },
    });
    return user;
  }

  async update(id: number, data: Prisma.UserUncheckedUpdateInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async remove(id: number) {
    const response = await this.prisma.user.delete({ where: { id } });
    return response;
  }

  // administrator activation
  async administratorActivation(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { activated: { set: true } },
    });
    return user;
  }

  // administrator deactivation
  async administratorDeactivation(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { activated: { set: false } },
    });
    return user;
  }
}
