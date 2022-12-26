import { Module } from '@nestjs/common';
import { CharacteristicsService } from './characteristics.service';
import { CharacteristicsController } from './characteristics.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  imports: [PrismaModule],
})
export class CharacteristicsModule {}
