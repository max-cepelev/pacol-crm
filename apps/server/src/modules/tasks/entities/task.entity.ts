import { Client } from '~/modules/clients/entities/client.entity';
import { Contact } from '~/modules/contacts/entities/contact.entity';
import { Distributor } from '~/modules/distributors/entities/distributor.entity';
import { Project } from '~/modules/projects/entities/project.entity';
import { TaskStatus } from '~/modules/task-statuses/entities/task-status.entity';
import { User } from '~/modules/users/entities/user.entity';

export class Task {
  id: number;
  title: string;
  dateStarted: Date;
  dateEnded: Date | null;
  content: string;
  status?: TaskStatus;
  statusId: number;
  distributorId: number | null;
  distributor?: Distributor | null;
  clientId: number | null;
  client?: Client | null;
  projectId: number | null;
  project?: Project | null;
  userId: number;
  user?: User;
  contactId: number | null;
  contact?: Contact | null;
  createdAt: Date;
  updatedAt: Date;
}
