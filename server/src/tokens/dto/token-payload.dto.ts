import { Role } from '@prisma/client';

export class TokenPayload {
  id: number;
  email: string;
  activated: boolean;
  role: Role;
}
