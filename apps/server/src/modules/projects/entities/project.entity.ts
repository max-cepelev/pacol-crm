import { Client } from '~/modules/clients/entities/client.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Group } from '~/modules/groups/entities/group.entity';
import { ProjectStatus } from '~/modules/project-statuses/entities/project-status.entity';
import { Sale } from '~/modules/sales/entities/sale.entity';
import { Task } from '~/modules/tasks/entities/task.entity';

export class Project {
  id: number;
  name: string;
  description: string | null;
  discount: number | null;
  startDate: Date;
  finishDate: Date | null;
  status?: ProjectStatus;
  statusId: number;
  distributorId: number;
  distributor?: Distributor;
  clientId: number;
  client?: Client;
  groupId: number;
  group?: Group;
  tasks?: Task[];
  sales?: Sale[];
}
