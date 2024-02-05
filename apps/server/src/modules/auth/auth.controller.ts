import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { SignupDto } from './dto/signup.dto';
import type { FastifyReply, FastifyRequest } from 'fastify';

const secure = true;
const maxAge = 30 * 24 * 60 * 60 * 1000;
const sameSite = 'none';
const path = '/';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    try {
      const email = await this.authService.signup(dto);
      response
        .status(HttpStatus.CREATED)
        .send({ message: `Пользователь ${email} зарегистрирован` });
    } catch (error) {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Ошибка при регистрации', error });
    }
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: { user: User },
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    return this.authService.login(req.user).then((res) => {
      response.cookie('refreshToken', res.refreshToken, {
        sameSite,
        httpOnly: true,
        maxAge,
        secure,
        path,
      });
      return { user: res.user, token: res.accessToken };
    });
  }

  @Get('refresh')
  async refresh(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const refreshToken = request.cookies['refreshToken'];
    return this.authService.refresh(refreshToken).then((res) => {
      response.cookie('refreshToken', res.refreshToken, {
        sameSite,
        httpOnly: true,
        maxAge,
        secure,
        path,
      });
      return { user: res.user, token: res.accessToken };
    });
  }

  @Post('logout')
  async logout(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const refreshToken = request.cookies['refreshToken'];
    return this.authService.logout(refreshToken).then(() => {
      response.clearCookie('refreshToken');
    });
  }
}
