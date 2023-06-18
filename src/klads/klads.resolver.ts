import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { log } from 'console';

@Resolver('Klad')
export class KladsResolver {
  constructor(
    private readonly kladsService: KladsService,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly companiesService: CompaniesService,
    private readonly milestonesService: MilestonesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createKlad')
  create(
    @Args('createKladInput') createKladInput: Prisma.KladCreateInput,
    @Context() context: any,
  ) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    createKladInput.ownerId = userId;
    return this.kladsService.create(createKladInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query('klads')
  findAll() {
    return this.kladsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query('klad')
  findOne(@Args('id') id: string) {
    return this.kladsService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateKlad')
  update(
    @Args('id') id: string,
    @Args('updateKladInput') updateKladInput: Prisma.KladUpdateInput,
    @Context() context: any,
  ) {
    const { req: request, res } = context;
    const ownerId: string = request.user.userId;
    return this.kladsService.update(
      { id_ownerId: { id, ownerId } },
      updateKladInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeKlad')
  remove(@Args('id') id: string, @Context() context: any) {
    const { req: request, res } = context;
    const ownerId: string = request.user.userId;
    return this.kladsService.remove({ id_ownerId: { id, ownerId } });
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
