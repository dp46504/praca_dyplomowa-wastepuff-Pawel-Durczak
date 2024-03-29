import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/data-source';
import { PackModule } from './pack/pack.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRootAsync(dataSourceOptions),
    PackModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
