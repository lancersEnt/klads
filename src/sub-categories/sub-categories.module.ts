import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesResolver } from './sub-categories.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [SubCategoriesResolver, SubCategoriesService, PrismaService],
})
export class SubCategoriesModule {}
