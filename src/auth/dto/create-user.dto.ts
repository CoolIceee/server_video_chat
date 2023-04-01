export class CreateUserDto {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly isActiveted: boolean;
  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.isActiveted = model.isActiveted;
  }
}
