import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsResolver } from './investments.resolver';
import { InvestmentsService } from './investments.service';

describe('InvestmentsResolver', () => {
  let resolver: InvestmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentsResolver, InvestmentsService],
    }).compile();

    resolver = module.get<InvestmentsResolver>(InvestmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
