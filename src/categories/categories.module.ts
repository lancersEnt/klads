import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { KladsService } from 'src/klads/klads.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    CategoriesResolver,
    CategoriesService,
    SubCategoriesService,
    KladsService,
    PrismaService,
    AuthService,
    JwtService,
  ],
})
export class CategoriesModule {}
