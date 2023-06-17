import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { KladsService } from './klads.service';
import { Prisma } from '@prisma/client';
import {
  Category,
  Company,
  Klad,
  Milestone,
  SubCategory,
  User,
} from 'src/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { CompaniesService } from 'src/companies/companies.service';
import { MilestonesService } from 'src/milestones/milestones.service';

@Resolver('Klad')
export class KladsResolver {
  constructor(
    private readonly kladsService: KladsService,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly companiesService: CompaniesService,
    private readonly milestonesService: MilestonesService,
  ) {}

  @Mutation('createKlad')
  create(@Args('createKladInput') createKladInput: Prisma.KladCreateInput) {
    return this.kladsService.create(createKladInput);
  }

  @Query('klads')
  findAll() {
    return this.kladsService.findAll();
  }

  @Query('klad')
  findOne(@Args('id') id: string) {
    return this.kladsService.findOne({ id });
  }

  @Mutation('updateKlad')
  update(
    @Args('id') id: string,
    @Args('updateKladInput') updateKladInput: Prisma.KladUpdateInput,
  ) {
    return this.kladsService.update({ id }, updateKladInput);
  }

  @Mutation('removeKlad')
  remove(@Args('id') id: string) {
    return this.kladsService.remove({ id });
  }

  @ResolveField('category', () => Category)
  category(@Parent() klad: Klad) {
    return this.categoriesService.findOne({ id: klad.categoryId });
  }

  @ResolveField('subCategory', () => SubCategory)
  subCategory(@Parent() klad: Klad) {
    return this.subCategoriesService.findOne({ id: klad.subCategoryId });
  }

  @ResolveField('company', () => Company)
  company(@Parent() klad: Klad) {
    return this.companiesService.findOne({ id: klad.companyId });
  }

  @ResolveField('milestones', () => [Milestone])
  milestones(@Parent() klad: Klad) {
    return this.milestonesService.forKlad(klad.id);
  }

  @ResolveField('owner', () => User)
  owner(@Parent() klad: Klad): any {
    return { __typename: 'User', id: klad.ownerId };
  }
}
