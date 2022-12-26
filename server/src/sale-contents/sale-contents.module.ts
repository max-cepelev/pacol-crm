import { Module } from '@nestjs/common';
import { SaleContentsService } from './sale-contents.service';
import { SaleContentsController } from './sale-contents.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [SaleContentsController],
  providers: [SaleContentsService],
  imports: [PrismaModule],
})
export class SaleContentsModule {}
