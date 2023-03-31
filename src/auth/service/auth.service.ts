import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { CreateAuthDto } from '../dto/create-auth.dto';

import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import MailService from './mail.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authtModel: Model<AuthDocument>,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(CreateAuthDto: CreateAuthDto) {
    const email = CreateAuthDto.email;
    const password = CreateAuthDto.password;
    const activetedLink = uuid.v4();
    const candidate = await this.authtModel.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await this.authtModel.create({
      email,
      password: hashPassword,
      activetedLink,
    });
    await MailService.sendActivatioMail(email, activetedLink);
    const tokens = this.tokenService.generateTokens()
    return activetedLink;
  }
}
