import { Test, TestingModule } from '@nestjs/testing';
import { PackController } from './pack.controller';

describe('PackController', () => {
  let controller: PackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackController],
    }).compile();

    controller = module.get<PackController>(PackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
