import { Client } from '~/modules/clients/entities/client.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Project } from '~/modules/projects/entities/project.entity';
import { SaleContent } from '~/modules/sale-contents/entities/sale-content.entity';
import { SaleStatus } from '~/modules/sale-statuses/entities/sale-status.entity';
import { User } from '~/modules/users/entities/user.entity';

export class Sale {
  id: number;
  date: Date;
  sum: number;
  distributorId: number;
  distributor?: Distributor;
  clientId: number;
  client?: Client;
  projectId: number;
  project?: Project;
  userId: number;
  user?: User;
  saleContent?: SaleContent[];
  statusId: number;
  status?: SaleStatus;
  createdAt: Date;
  updatedAt: Date;
}
