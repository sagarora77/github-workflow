import { Test, TestingModule } from '@nestjs/testing';
import { PolicySearchService } from './policy-search.service';

describe('PolicySearchService', () => {
  let service: PolicySearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicySearchService],
    }).compile();

    service = module.get<PolicySearchService>(PolicySearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
