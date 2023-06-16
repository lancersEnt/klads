import { Module } from '@nestjs/common';
import { KladsService } from './klads.service';
import { KladsResolver } from './klads.resolver';

@Module({
  providers: [KladsResolver, KladsService]
})
export class KladsModule {}
