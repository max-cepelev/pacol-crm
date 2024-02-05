import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';

@Module({
  controllers: [],
  providers: [TokensService],
  imports: [JwtModule],
  exports: [TokensService],
})
export class TokensModule {}
