import { Client } from '~/modules/clients/entities/client.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Task } from '~/modules/tasks/entities/task.entity';

export class Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  description: string | null;
  clientId: number;
  client?: Client;
  distributorId: number;
  distributor?: Distributor;
  tasks?: Task[];
}
