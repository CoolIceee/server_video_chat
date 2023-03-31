import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  create() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Auth.name) private authtModel: Model<AuthDocument>,
  ) {}

  async registerUser(CreateAuthDto) {
    const newUser = new this.authtModel(CreateAuthDto);
    return newUser.save();
  }
}
