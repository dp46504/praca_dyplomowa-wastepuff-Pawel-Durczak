import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/Log.entity';
import { Pack } from 'src/entities/Pack.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreatePackDto, PatchPackDto, UpdatePackDto } from './dto';

@Injectable()
export class PackService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Pack)
    private packRepository: Repository<Pack>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  public async getActivePack(user) {
    const userObject = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
      relations: {
        activePack: true,
      },
    });
    return userObject.activePack;
  }

  public async getUserPackages(user) {
    const packages = await this.packRepository.find({
      where: {
        owner: {
          email: user.email,
        },
      },
      relations: {
        owner: {
          activePack: true,
        },
      },
    });
    return packages;
  }

  public async addPackage(user, createPackDto: CreatePackDto) {
    if (createPackDto.left > createPackDto.size)
      throw new BadRequestException(
        'Number of cigarettes left must be lesser than pack size',
      );
    const pack = this.packRepository.create();
    pack.name = createPackDto.name;
    pack.size = createPackDto.size;
    pack.left = createPackDto.left;
    pack.price = Math.round(createPackDto.price);
    pack.owner = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });

    return await this.packRepository.save(pack);
  }

  public async updatePackage(
    user,
    packId: number,
    updatePackDto: UpdatePackDto,
  ) {
    if (updatePackDto.left > updatePackDto.size)
      throw new BadRequestException(
        'Number of cigarettes left must be lesser than pack size',
      );
    const pack = await this.packRepository.findOne({
      where: {
        id: packId,
        owner: {
          email: user.email,
        },
      },
    });
    if (!pack) throw new NotFoundException('Pack was not found');
    pack.name = updatePackDto.name;
    pack.price = Math.round(updatePackDto.price);
    pack.left = updatePackDto.left;
    pack.size = updatePackDto.size;
    return await this.packRepository.save(pack);
  }

  public async updateLeftInPackage(
    user,
    packId: number,
    patchPackDto: PatchPackDto,
  ) {
    const pack = await this.packRepository.findOne({
      where: {
        id: packId,
        owner: {
          email: user.email,
        },
      },
    });
    const userObject = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (!pack) throw new NotFoundException('Pack was not found');

    if (patchPackDto.left > pack.size)
      throw new BadRequestException(
        'Number of cigarettes left must be lesser than pack size',
      );

    if (patchPackDto.left > pack.left)
      throw new BadRequestException(
        "You can't remove more cigarettes than it's left in the package",
      );

    userObject.wasted +=
      (pack.price / pack.size) * Math.abs(pack.left - patchPackDto.left);

    userObject.lastSmoked = new Date(Date.now());

    const log = this.logRepository.create();
    log.user = userObject;
    log.nameOfCigarette = pack.name;
    log.quantity = Math.abs(pack.left - patchPackDto.left);
    log.price = log.quantity * (pack.price / pack.size);
    userObject.quantitySmoked += Math.abs(pack.left - patchPackDto.left);

    pack.left = patchPackDto.left;
    await this.usersRepository.save(userObject);
    await this.logRepository.save(log);
    if (patchPackDto.left === 0) return this.packRepository.remove(pack);
    return this.packRepository.save(pack);
  }

  public async deletePack(user, packId: number) {
    const pack = await this.packRepository.findOne({
      where: {
        id: packId,
        owner: {
          email: user.email,
        },
      },
    });
    if (!pack) throw new NotFoundException('Pack was not found');

    return await this.packRepository.remove(pack);
  }

  public async setActivePack(user, packId: number) {
    const userObject = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });
    const pack = await this.packRepository.findOne({
      where: {
        id: packId,
        owner: {
          email: user.email,
        },
      },
    });

    if (!pack) throw new NotFoundException('Pack was not found');
    userObject.activePack = pack;

    return this.usersRepository.save(userObject);
  }
}
