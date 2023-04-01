import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Token, TokenDocument } from '../schemas/token.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokentModel: Model<TokenDocument>,
    private jwtService: JwtService,
  ) {}
  generateTokens(payload) {
    const accessToken = this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.signAsync(payload);
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
