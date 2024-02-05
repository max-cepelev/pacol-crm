import { Module } from '@nestjs/common';
import { SaleContentsService } from './sale-contents.service';
import { SaleContentsController } from './sale-contents.controller';

@Module({
  controllers: [SaleContentsController],
  providers: [SaleContentsService],
})
export class SaleContentsModule {}
