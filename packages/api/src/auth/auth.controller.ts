import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterPayloadDto } from './dto';
import { LocalAuthGuard } from './local-auth.guard';
import { HttpInterceptor } from '../utils/interceptors/http.interceptor';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor, HttpInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerPayload: RegisterPayloadDto) {
    return this.authService.register(registerPayload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req) {
    return this.authService.getUser(req.user);
  }
}
