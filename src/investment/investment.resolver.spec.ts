import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentResolver } from './investment.resolver';
import { InvestmentService } from './investment.service';

describe('InvestmentResolver', () => {
  let resolver: InvestmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentResolver, InvestmentService],
    }).compile();

    resolver = module.get<InvestmentResolver>(InvestmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
