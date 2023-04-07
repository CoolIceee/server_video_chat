import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { CreateAuthDto } from '../dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { MailService } from './mail.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authtModel: Model<AuthDocument>,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async registerUser(CreateAuthDto: CreateAuthDto) {
    const email = CreateAuthDto.email;
    const password = CreateAuthDto.password;
    const activetedLink = uuid.v4();
    const candidate = await this.authtModel.findOne({ email });
    if (candidate) {
      await this.mailService.sendConfirmMail(email, activetedLink);
      const payload = {
        id: candidate.id,
        name: candidate.name,
        refreshToken: candidate.activetedLink,
      };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveToken(candidate.id, tokens.refreshToken);
      return { ...tokens, user: candidate };
    } else {
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await this.authtModel.create({
        email,
        password: hashPassword,
        activetedLink,
      });
      await this.mailService.sendConfirmMail(email, activetedLink);
      const payload = {
        id: user.id,
        name: user.name,
        refreshToken: user.activetedLink,
      };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveToken(user.id, tokens.refreshToken);
      return { ...tokens, user: user };
    }
  }
  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }
}
