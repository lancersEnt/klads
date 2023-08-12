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

@Module({
  providers: [
    KladsResolver,
    KladsService,
    PrismaService,
    GraphService,
    SubCategoriesService,
    CategoriesService,
    MilestonesService,
    UsersResolver,
    AuthService,
    JwtService,
  ],
  imports: [AuthModule],
})
export class KladsModule {}
