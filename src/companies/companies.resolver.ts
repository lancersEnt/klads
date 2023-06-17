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

@Resolver('Company')
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly kladsService: KladsService,
  ) {}

  @Mutation('createCompany')
  create(
    @Args('createCompanyInput') createCompanyInput: Prisma.CompanyCreateInput,
  ) {
    return this.companiesService.create(createCompanyInput);
  }

  @Query('companies')
  findAll() {
    return this.companiesService.findAll();
  }

  @Query('company')
  findOne(@Args('id') id: string) {
    return this.companiesService.findOne({ id });
  }

  @Mutation('updateCompany')
  update(
    @Args('id') id: string,
    @Args('updateCompanyInput') updateCompanyInput: Prisma.CompanyUpdateInput,
  ) {
    return this.companiesService.update({ id }, updateCompanyInput);
  }

  @Mutation('removeCompany')
  remove(@Args('id') id: string) {
    return this.companiesService.remove({ id });
  }

  @ResolveField('klads', () => [Klad])
  klads(@Parent() company: Company) {
    return this.kladsService.forCompany(company.id);
  }
}
