export class CreateUserDto {
  email: string;
  name?: string;
  phone?: string;
  description: string;
  password: string;
  salt: string;
}
