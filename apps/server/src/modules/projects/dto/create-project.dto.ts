export class CreateProjectDto {
  name: string;
  description?: string;
  discount?: number;
  startDate: Date;
  finishDate?: Date;
}
