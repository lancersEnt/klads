import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Prisma } from '@prisma/client';

@Resolver('Company')
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

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
}
