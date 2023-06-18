import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Prisma } from '@prisma/client';
import { KladsService } from 'src/klads/klads.service';
import { Company, Klad } from 'src/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Company')
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly kladsService: KladsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createCompany')
  create(
    @Args('createCompanyInput') createCompanyInput: Prisma.CompanyCreateInput,
  ) {
    return this.companiesService.create(createCompanyInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query('companies')
  findAll() {
    return this.companiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query('company')
  findOne(@Args('id') id: string) {
    return this.companiesService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateCompany')
  update(
    @Args('id') id: string,
    @Args('updateCompanyInput') updateCompanyInput: Prisma.CompanyUpdateInput,
  ) {
    return this.companiesService.update({ id }, updateCompanyInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeCompany')
  remove(@Args('id') id: string) {
    return this.companiesService.remove({ id });
  }

  @ResolveField('klads', () => [Klad])
  klads(@Parent() company: Company) {
    return this.kladsService.forCompany(company.id);
  }
}
