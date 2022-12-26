import { Module } from '@nestjs/common';
import { ProjectStatusesService } from './project-statuses.service';
import { ProjectStatusesController } from './project-statuses.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [ProjectStatusesController],
  providers: [ProjectStatusesService],
  imports: [PrismaModule],
})
export class ProjectStatusesModule {}
