import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pack } from 'src/entities/Pack.entity';
import { User } from 'src/entities/User.entity';
import { PackController } from './pack.controller';
import { PackService } from './pack.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pack]), TypeOrmModule.forFeature([User])],
  controllers: [PackController],
  providers: [PackService],
})
export class PackModule {}
