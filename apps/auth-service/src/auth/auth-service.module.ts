import { Module } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { AuthController } from './auth-service.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({ useFactory: jwtConfig }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtModule, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
