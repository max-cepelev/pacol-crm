export class CreateTaskDto {
  title: string;
  dateStarted: Date;
  dateEnded?: Date;
  content: string;
}
