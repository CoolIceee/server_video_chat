import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly productsService: AuthService) {}
  @Post()
  registerUser(@Body() CreateAuthDto: CreateAuthDto) {
    return this.productsService.registerUser(CreateAuthDto);
  }
}
