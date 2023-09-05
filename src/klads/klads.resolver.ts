import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
  ResolveReference,
} from '@nestjs/graphql';
import { KladsService } from './klads.service';
import { Prisma } from '@prisma/client';
import {
  Category,
  Investment,
  Klad,
  Milestone,
  SubCategory,
  User,
} from 'src/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { MilestonesService } from 'src/milestones/milestones.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { log } from 'console';
import { PageGuard } from 'src/auth/guards/page.guard';
import { InvestmentService } from 'src/investment/investment.service';

@Resolver('Klad')
export class KladsResolver {
  constructor(
    private readonly kladsService: KladsService,
    private readonly categoriesService: CategoriesService,
    private readonly subCategoriesService: SubCategoriesService,
    private readonly milestonesService: MilestonesService,
    private readonly investmentsService: InvestmentService,
  ) {}

  @UseGuards(JwtAuthGuard, PageGuard)
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
  findAll(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.kladsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query('filtredKlads')
  filtredKlads(@Args('filter') filter: Filter) {
    log(filter);
    return this.kladsService.filtredKlads(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Query('recommendedKlads')
  recommendedKlads(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.kladsService.recommendedKlads(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query('myKlads')
  myKlads(@Context() context: any) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    return this.kladsService.myKlads(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query('submittedKlads')
  submittedKlads() {
    return this.kladsService.submittedKlads();
  }

  @UseGuards(JwtAuthGuard)
  @Query('approvedKlads')
  approvedKlads() {
    return this.kladsService.approvedKlads();
  }

  @Query('klad')
  findOne(@Args('id') id: string) {
    return this.kladsService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Query('liveKlad')
  liveKlad(@Args('id') id: string) {
    return this.kladsService.liveKlad(id);
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
    return this.kladsService.update({ id }, updateKladInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeKlad')
  remove(@Args('id') id: string, @Context() context: any) {
    const { req: request, res } = context;
    const ownerId: string = request.user.userId;
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

  @ResolveField('milestones', () => [Milestone])
  milestones(@Parent() klad: Klad) {
    return this.milestonesService.forKlad(klad.id);
  }

  @ResolveField('investments', () => [Investment])
  investments(@Parent() klad: Klad) {
    return this.investmentsService.forKlad(klad.id);
  }

  @ResolveField('owner', () => User)
  owner(@Parent() klad: Klad): any {
    return { __typename: 'User', id: klad.ownerId };
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<Klad> {
    const id = reference.id;
    return this.kladsService.findOne({ id });
  }
}
