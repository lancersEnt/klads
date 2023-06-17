import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { PrismaService } from 'prisma/prisma.service';
import { KladsService } from 'src/klads/klads.service';

@Module({
  providers: [CompaniesResolver, CompaniesService, KladsService, PrismaService],
})
export class CompaniesModule {}
