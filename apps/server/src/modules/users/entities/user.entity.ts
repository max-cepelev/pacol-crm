import { Role } from '@prisma/client';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Sale } from '~/modules/sales/entities/sale.entity';
import { Task } from '~/modules/tasks/entities/task.entity';
import { Token } from '~/modules/tokens/entities/token.entity';

export class User {
  id!: number;
  email!: string;
  name!: string | null;
  phone!: string | null;
  description!: string;
  password!: string;
  salt!: string;
  activated!: boolean;
  role!: Role;
  token?: Token | null;
  tasks?: Task[];
  sales?: Sale[];
  distributorId!: number | null;
  distributor?: Distributor | null;
  createdAt!: Date;
  updatedAt!: Date;
}
