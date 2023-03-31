export class CreateAuthDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isActiveted: boolean;
  readonly activetedLink: string;
  constructor(model) {
    (this.email = model.email),
      (this.id = model.id),
      (this.isActiveted = model.isActiveted);
  }
}
