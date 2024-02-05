import { User } from '~/modules/users/entities/user.entity';

export class Token {
  id: number;
  refreshToken: string;
  user?: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
