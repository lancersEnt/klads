import { Module } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { MilestonesResolver } from './milestones.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { KladsService } from 'src/klads/klads.service';
import { GraphService } from 'src/graph/graph.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  providers: [
    MilestonesResolver,
    MilestonesService,
    KladsService,
    PrismaService,
    GraphService,
    KafkaService,
  ],
})
export class MilestonesModule {}
