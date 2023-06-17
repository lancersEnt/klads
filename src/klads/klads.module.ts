import { Module } from '@nestjs/common';
import { KladsService } from './klads.service';
import { KladsResolver } from './klads.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { CompaniesService } from 'src/companies/companies.service';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';

@Module({
  providers: [
    KladsResolver,
    KladsService,
    PrismaService,
    SubCategoriesService,
    CategoriesService,
    CompaniesService,
  ],
})
export class KladsModule {}
