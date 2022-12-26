import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { TokensService } from './tokens.service';

@Module({
  controllers: [],
  providers: [TokensService],
  imports: [PrismaModule, JwtModule],
  exports: [TokensService],
})
export class TokensModule {}
