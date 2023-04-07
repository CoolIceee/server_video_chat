import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async registerUser(
    @Res({ passthrough: true }) res,
    @Body() CreateAuthDto: CreateAuthDto,
  ) {
    const userData = await this.authService.registerUser(CreateAuthDto);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Delete()
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    const { refreshToken } = req.cookies;
    const token = await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return token;
  }
}
