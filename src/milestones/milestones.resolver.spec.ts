import { Test, TestingModule } from '@nestjs/testing';
import { MilestonesResolver } from './milestones.resolver';
import { MilestonesService } from './milestones.service';

describe('MilestonesResolver', () => {
  let resolver: MilestonesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilestonesResolver, MilestonesService],
    }).compile();

    resolver = module.get<MilestonesResolver>(MilestonesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
