import { Client } from '~/modules/clients/entities/client.entity';
import { Contact } from '~/modules/contacts/entities/contact.entity';
import { Group } from '~/modules/groups/entities/group.entity';
import { Project } from '~/modules/projects/entities/project.entity';
import { Sale } from '~/modules/sales/entities/sale.entity';
import { Task } from '~/modules/tasks/entities/task.entity';
import { User } from '~/modules/users/entities/user.entity';

export class Distributor {
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
  discount: number;
  clients?: Client[];
  projects?: Project[];
  sales?: Sale[];
  tasks?: Task[];
  contacts?: Contact[];
  users?: User[];
  groups?: Group[];
}
