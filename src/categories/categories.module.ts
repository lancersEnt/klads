import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    PrismaService,
    SubCategoriesService,
  ],
})
export class CategoriesModule {}
