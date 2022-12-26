import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';
// import { v4 as uuidv4 } from 'uuid';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const hash = user.password;
      const isPassEquals = await bcrypt.compare(password, hash);
      if (!isPassEquals) {
        throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
      }
      return user;
    } else {
      throw new HttpException(
        `Пользователь с email ${email} не найден`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // registration user
  async signup(dto: Prisma.UserUncheckedCreateInput) {
    const { name, email, password, phone, description } = dto;
    const candidate = await this.usersService.findByEmail(email);
    if (candidate) {
      throw new HttpException(
        `Пользователь с адресом ${email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await this.usersService.create({
      email,
      password: hash,
      description,
      name,
      phone,
      role: 'USER',
      activated: false,
    });

    return user.email;
  }

  // login user
  async login(context: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<User, 'id' | 'name' | 'email' | 'phone' | 'role' | 'activated'>;
  }> {
    const tokens = await this.tokensService.generateTokens({
      id: context.id,
      email: context.email,
      activated: context.activated,
      role: context.role,
    });
    return {
      ...tokens,
      user: {
        id: context.id,
        name: context.name,
        email: context.email,
        phone: context.phone,
        role: context.role,
        activated: context.activated,
      },
    };
  }

  // delete refresh token
  async logout(refreshToken: string) {
    const response = await this.tokensService.removeToken(refreshToken);
    return response;
  }

  // refresh token
  async refresh(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<User, 'id' | 'name' | 'email' | 'phone' | 'role' | 'activated'>;
  }> {
    if (!refreshToken) {
      throw new HttpException(
        `Пользователь не авторизован, токен не найден`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const userData = this.tokensService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw new HttpException(
        `Пользователь не авторизован`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.usersService.findOne(userData.id);
    const tokens = await this.tokensService.generateTokens({
      id: user.id,
      email: user.email,
      activated: user.activated,
      role: user.role,
    });
    return {
      ...tokens,
      user,
    };
  }
}
