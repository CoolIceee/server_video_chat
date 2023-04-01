export class CreateAuthDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly isActiveted: boolean;
  readonly activetedLink: string;
  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isActiveted = model.isActiveted;
  }
}
