import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Token, TokenDocument } from '../schemas/token.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokentModel: Model<TokenDocument>,
  ) {}
  generateTokens(payload) {
    const accessToken = jwt.sing(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sing(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokentModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokentModel.create({ user: userId, refreshToken });
    return token;
  }
}
