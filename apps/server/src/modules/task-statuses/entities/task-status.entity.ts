import { Task } from '~/modules/tasks/entities/task.entity';

export class TaskStatus {
  id: number;
  name: string;
  tasks?: Task[];
}
