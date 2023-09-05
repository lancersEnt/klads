import { Module } from '@nestjs/common';
import { KladsService } from './klads.service';
import { KladsResolver } from './klads.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { MilestonesService } from 'src/milestones/milestones.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GraphService } from 'src/graph/graph.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { InvestmentService } from 'src/investment/investment.service';

@Module({
  providers: [
    KladsResolver,
    KladsService,
    PrismaService,
    GraphService,
    SubCategoriesService,
    CategoriesService,
    MilestonesService,
    InvestmentService,
    UsersResolver,
    AuthService,
    JwtService,
    KafkaService,
  ],
  imports: [AuthModule],
})
export class KladsModule {}
