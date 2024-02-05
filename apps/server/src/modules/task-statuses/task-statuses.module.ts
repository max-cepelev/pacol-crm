import { Module } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { TaskStatusesController } from './task-statuses.controller';

@Module({
  controllers: [TaskStatusesController],
  providers: [TaskStatusesService],
  exports: [TaskStatusesService],
})
export class TaskStatusesModule {}
