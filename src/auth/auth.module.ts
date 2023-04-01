import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { TokenService } from './service/token.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  providers: [AuthService, TokenService],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
