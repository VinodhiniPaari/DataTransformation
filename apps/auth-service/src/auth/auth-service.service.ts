import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface User {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const userExists = this.users.find((user) => user.username === username);
    if (userExists) throw new Error('User already exists');
    this.users.push({ username, password });
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const token = this.jwtService.sign({ username });
    return { accessToken: token };
  }
}
