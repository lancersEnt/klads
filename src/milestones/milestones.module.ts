import { Module } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestonesResolver } from './milestones.resolver';

@Module({
  providers: [MilestonesResolver, MilestonesService]
})
export class MilestonesModule {}
