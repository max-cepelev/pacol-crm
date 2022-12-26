import { Module } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { TaskStatusesController } from './task-statuses.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [TaskStatusesController],
  providers: [TaskStatusesService],
  imports: [PrismaModule],
})
export class TaskStatusesModule {}
