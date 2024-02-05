import { Module } from '@nestjs/common';
import { SaleStatusesService } from './sale-statuses.service';
import { SaleStatusesController } from './sale-statuses.controller';

@Module({
  controllers: [SaleStatusesController],
  providers: [SaleStatusesService],
})
export class SaleStatusesModule {}
