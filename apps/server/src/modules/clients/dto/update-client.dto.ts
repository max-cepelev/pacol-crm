import { Prisma } from '@prisma/client';

export class UpdateClientDto {
  name?: string;
  fullName?: string;
  legalAddress?: string;
  actualAddress?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  manager?: string;
  website?: string;
  phone?: string;
  email?: string;
  info?: string;
  constructor(model: Prisma.ClientUncheckedUpdateInput) {
    Object.entries(model).forEach(([key, value]) => {
      if (value && key in UpdateClientDto) this[key] = value;
    });
  }
}
