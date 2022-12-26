import { Module } from '@nestjs/common';
import { DistributorsService } from './distributors.service';
import { DistributorsController } from './distributors.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [DistributorsController],
  providers: [DistributorsService],
  imports: [PrismaModule],
})
export class DistributorsModule {}
