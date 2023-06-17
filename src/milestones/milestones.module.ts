import { Module } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestonesResolver } from './milestones.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { KladsService } from 'src/klads/klads.service';

@Module({
  providers: [
    MilestonesResolver,
    MilestonesService,
    KladsService,
    PrismaService,
  ],
})
export class MilestonesModule {}
