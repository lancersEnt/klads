import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { KladsService } from 'src/klads/klads.service';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    SubCategoriesService,
    KladsService,
    PrismaService,
  ],
})
export class CategoriesModule {}
