import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/Log.entity';
import { User } from 'src/entities/User.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async getLogs(user, startDateParam, endDateParam) {
    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);
    const userObject = await this.userRepository.findOne({
      where: { email: user.email },
    });
    const logs = await this.logRepository.find({
      where: {
        user: userObject,
        createdAt: Between(startDate, endDate),
      },
    });
    return logs;
  }

  public async getFavoritePack(user) {
    const userObject = await this.userRepository.findOne({
      where: { email: user.email },
    });

    const logs = await this.logRepository.find({
      where: {
        user: userObject,
      },
    });
  }
}
