import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '~/modules/tokens/dto/token-payload.dto';
import { UsersService } from '~/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('ACCESS_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const { id } = payload;
    const user = await this.usersService.findOne(id);
    if (user && user.activated) {
      return user;
    } else {
      return false;
    }
  }
}
