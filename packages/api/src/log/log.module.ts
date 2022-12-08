import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/Log.entity';
import { User } from 'src/entities/User.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), TypeOrmModule.forFeature([User])],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
