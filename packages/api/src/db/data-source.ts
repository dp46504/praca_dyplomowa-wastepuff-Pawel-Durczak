import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const dataSourceOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pracadyplomowa',
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      migrations: ['dist/db/migrations/*.js'],
      synchronize: false,
    };
  },
};
