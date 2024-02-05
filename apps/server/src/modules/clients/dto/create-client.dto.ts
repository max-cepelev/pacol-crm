import { Prisma } from '@prisma/client';

export class CreateClientDto {
  name: string;
  fullName: string;
  legalAddress?: string;
  actualAddress?: string;
  inn: string;
  kpp?: string;
  ogrn?: string;
  manager?: string;
  website?: string;
  phone?: string;
  email?: string;
  info?: string;
  constructor(model: Prisma.ClientUncheckedCreateInput) {
    this.name = model.name;
    this.fullName = model.fullName;
    this.legalAddress = model.legalAddress;
    this.actualAddress = model.actualAddress;
    this.inn = model.inn;
    this.kpp = model.kpp;
    this.ogrn = model.ogrn;
    this.manager = model.manager;
    this.website = model.website;
    this.phone = model.phone;
    this.email = model.email;
    this.info = model.info;
  }
}
