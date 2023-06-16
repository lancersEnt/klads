import { Test, TestingModule } from '@nestjs/testing';
import { KladsService } from './klads.service';

describe('KladsService', () => {
  let service: KladsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KladsService],
    }).compile();

    service = module.get<KladsService>(KladsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
