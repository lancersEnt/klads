import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesResolver } from './sub-categories.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';
import { KladsService } from 'src/klads/klads.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { GraphService } from 'src/graph/graph.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  providers: [
    AuthService,
    JwtService,
    SubCategoriesResolver,
    SubCategoriesService,
    CategoriesService,
    GraphService,
    KladsService,
    PrismaService,
    KafkaService,
  ],
})
export class SubCategoriesModule {}
