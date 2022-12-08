import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
  Body,
  Param,
} from '@nestjs/common';
import { ParseFloatPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpInterceptor } from 'src/utils/interceptors/http.interceptor';
import { LogService } from './log.service';

@Controller('log')
@UseInterceptors(ClassSerializerInterceptor, HttpInterceptor)
export class LogController {
  constructor(private logService: LogService) {}

  @Get(':startDate/:endDate')
  @UseGuards(JwtAuthGuard)
  async getLogs(
    @Req() req,
    @Param('startDate', ParseFloatPipe) startDateParam,
    @Param('endDate', ParseFloatPipe) endDateParam,
  ) {
    return this.logService.getLogs(req.user, startDateParam, endDateParam);
  }

  @Get('favoritePack')
  @UseGuards(JwtAuthGuard)
  async getFavoritePack(@Req() req) {
    return this.logService.getFavoritePack(req.user);
  }
}
