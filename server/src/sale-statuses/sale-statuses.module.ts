import { Module } from '@nestjs/common';
import { SaleStatusesService } from './sale-statuses.service';
import { SaleStatusesController } from './sale-statuses.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [SaleStatusesController],
  providers: [SaleStatusesService],
  imports: [PrismaModule],
})
export class SaleStatusesModule {}
