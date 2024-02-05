import { Client } from '~/modules/clients/entities/client.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Project } from '~/modules/projects/entities/project.entity';

export class Group {
  id: number;
  name: string;
  clients?: Client[];
  projects?: Project[];
  distributor?: Distributor | null;
  distributorId: number | null;
}
