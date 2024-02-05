import { Project } from '~/modules/projects/entities/project.entity';

export class ProjectStatus {
  id: number;
  name: string;
  projects?: Project[];
}
