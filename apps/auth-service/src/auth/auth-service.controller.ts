import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute(): Promise<{ message: string }> {
    return { message: 'You have accessed a protected route!' };
  }
}
