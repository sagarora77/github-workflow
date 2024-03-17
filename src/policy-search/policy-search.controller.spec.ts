import { Test, TestingModule } from '@nestjs/testing';
import { PolicySearchController } from './policy-search.controller';

describe('PolicySearchController', () => {
  let controller: PolicySearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicySearchController],
    }).compile();

    controller = module.get<PolicySearchController>(PolicySearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
