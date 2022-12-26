import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { TokenPayload } from './dto/token-payload.dto';

@Injectable()
export class TokensService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async generateTokens(payload: TokenPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '30m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '30d',
    });
    await this.saveToken(payload.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.prisma.token.findFirst({
      where: { userId },
    });
    if (tokenData) {
      await this.prisma.token.update({
        data: { refreshToken: { set: refreshToken } },
        where: { id: tokenData.id },
      });
    } else {
      await this.prisma.token.create({ data: { userId, refreshToken } });
    }
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.prisma.token.findFirst({
      where: { refreshToken },
    });
    if (tokenData) {
      await this.prisma.token.delete({
        where: { id: tokenData.id },
      });
    }
  }

  async findToken(refreshToken: string) {
    if (refreshToken) {
      const tokenData = await this.prisma.token.findFirst({
        where: { refreshToken },
      });
      return tokenData;
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = this.jwtService.verify<TokenPayload>(accessToken, {
        secret: process.env.ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): TokenPayload | null {
    try {
      const userData = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
}
