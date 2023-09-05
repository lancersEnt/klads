import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentResolver } from './investment.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { KladsService } from 'src/klads/klads.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { GraphService } from 'src/graph/graph.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [
    InvestmentResolver,
    InvestmentService,
    PrismaService,
    AuthService,
    KladsService,
    UsersResolver,
    JwtService,
    KafkaService,
    GraphService,
  ],
  imports: [AuthModule],
})
export class InvestmentModule {}
