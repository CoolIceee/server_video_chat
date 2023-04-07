export class CreateAuthDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isActiveted: boolean;
  readonly activetedLink: string;
}
