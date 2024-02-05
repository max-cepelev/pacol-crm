export class SignupDto {
  readonly email: string;
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly description: string;
  readonly password: string;
}
