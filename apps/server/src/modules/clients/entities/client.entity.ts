import { Contact } from '~/modules/contacts/entities/contact.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Group } from '~/modules/groups/entities/group.entity';
import { Project } from '~/modules/projects/entities/project.entity';
import { Sale } from '~/modules/sales/entities/sale.entity';
import { Task } from '~/modules/tasks/entities/task.entity';

export class Client {
  id: number;
  name: string;
  fullName: string;
  legalAddress: string | null;
  actualAddress: string | null;
  inn: string;
  kpp: string | null;
  ogrn: string | null;
  manager: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  info: string | null;
  distributor?: Distributor | null;
  distributorId: number | null;
  group?: Group;
  groupId: number;
  projects?: Project[];
  tasks?: Task[];
  contacts?: Contact[];
  sales?: Sale[];
}
