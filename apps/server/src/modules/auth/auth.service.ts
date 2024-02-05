import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokensService } from '~/modules/tokens/tokens.service';
import { UsersService } from '~/modules/users/users.service';
import { User } from '@prisma/client';
import { hashPassword, verifyPassword } from 'src/utils/hash';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isPassEquals = verifyPassword({
        candidatePassword: password,
        salt: user.salt,
        hash: user.password,
      });
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
  async signup(dto: SignupDto) {
    const { name, email, password, phone, description } = dto;
    const candidate = await this.usersService.findByEmail(email);
    if (candidate) {
      throw new HttpException(
        `Пользователь с адресом ${email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hash, salt } = hashPassword(password);
    const user = await this.usersService.create({
      email,
      password: hash,
      description,
      name,
      salt,
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
  async logout(refreshToken?: string) {
    if (!refreshToken) {
      throw new HttpException(`Токен не найден`, HttpStatus.UNAUTHORIZED);
    }
    const response = await this.tokensService.removeToken(refreshToken);
    return response;
  }

  // refresh token
  async refresh(refreshToken?: string): Promise<{
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
    if (!user) {
      throw new HttpException(
        `Пользователь не найден`,
        HttpStatus.UNAUTHORIZED,
      );
    }
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
