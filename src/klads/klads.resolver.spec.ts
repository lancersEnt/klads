import { Test, TestingModule } from '@nestjs/testing';
import { KladsResolver } from './klads.resolver';
import { KladsService } from './klads.service';

describe('KladsResolver', () => {
  let resolver: KladsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KladsResolver, KladsService],
    }).compile();

    resolver = module.get<KladsResolver>(KladsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
