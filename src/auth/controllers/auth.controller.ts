import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post()
  async registerUser(
    @Res({ passthrough: true }) res,
    @Body() CreateAuthDto: CreateAuthDto,
  ) {
    const email = CreateAuthDto.email;
    const password = CreateAuthDto.password;
    const userData = await this.AuthService.registerUser(CreateAuthDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }
}
