import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesResolver } from './sub-categories.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  providers: [
    SubCategoriesResolver,
    SubCategoriesService,
    CategoriesService,
    PrismaService,
  ],
})
export class SubCategoriesModule {}
