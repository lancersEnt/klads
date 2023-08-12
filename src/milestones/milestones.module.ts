import { Module } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestonesResolver } from './milestones.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { KladsService } from 'src/klads/klads.service';
import { GraphService } from 'src/graph/graph.service';

@Module({
  providers: [
    MilestonesResolver,
    MilestonesService,
    KladsService,
    PrismaService,
    GraphService,
  ],
})
export class MilestonesModule {}
