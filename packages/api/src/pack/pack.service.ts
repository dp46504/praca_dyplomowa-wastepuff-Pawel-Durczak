import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  public async getUserPackages(user) {
    const packages = await this.packRepository.find({
      where: {
        owner: {
          email: user.email,
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

    if (!pack) throw new NotFoundException('Pack was not found');

    if (patchPackDto.left > pack.size)
      throw new BadRequestException(
        'Number of cigarettes left must be lesser than pack size',
      );

    pack.left = patchPackDto.left;
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
}
