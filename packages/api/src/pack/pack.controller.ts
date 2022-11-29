import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpInterceptor } from 'src/utils/interceptors/http.interceptor';
import { CreatePackDto, PatchPackDto, UpdatePackDto } from './dto';
import { PackService } from './pack.service';

@Controller('pack')
@UseInterceptors(ClassSerializerInterceptor, HttpInterceptor)
export class PackController {
  constructor(private packService: PackService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserPackages(@Req() req) {
    return this.packService.getUserPackages(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addPackage(@Req() req, @Body() createPackDto: CreatePackDto) {
    return this.packService.addPackage(req.user, createPackDto);
  }

  @Put(':packId')
  @UseGuards(JwtAuthGuard)
  async updatePackage(
    @Req() req,
    @Param('packId', ParseIntPipe) packId: number,
    @Body() updatePackDto: UpdatePackDto,
  ) {
    return this.packService.updatePackage(req.user, packId, updatePackDto);
  }

  @Patch(':packId')
  @UseGuards(JwtAuthGuard)
  async updateLeftInPackage(
    @Req() req,
    @Param('packId', ParseIntPipe) packId: number,
    @Body() patchPackDto: PatchPackDto,
  ) {
    return this.packService.updateLeftInPackage(req.user, packId, patchPackDto);
  }

  @Delete(':packId')
  @UseGuards(JwtAuthGuard)
  async deletePack(@Req() req, @Param('packId', ParseIntPipe) packId: number) {
    return this.packService.deletePack(req.user, packId);
  }

  @Patch('setActive/:packId')
  @UseGuards(JwtAuthGuard)
  async setActivePack(
    @Req() req,
    @Param('packId', ParseIntPipe) packId: number,
  ) {
    return this.packService.setActivePack(req.user, packId);
  }
}
