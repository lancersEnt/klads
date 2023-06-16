import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalsResolver } from './approvals.resolver';
import { ApprovalsService } from './approvals.service';

describe('ApprovalsResolver', () => {
  let resolver: ApprovalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalsResolver, ApprovalsService],
    }).compile();

    resolver = module.get<ApprovalsResolver>(ApprovalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
