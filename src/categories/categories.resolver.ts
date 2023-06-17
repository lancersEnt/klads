import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';
import { Category, Klad, SubCategory } from 'src/graphql';
import { SubCategoriesService } from 'src/sub-categories/sub-categories.service';
import { KladsService } from 'src/klads/klads.service';

@Resolver('Category')
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly subCategortiesService: SubCategoriesService,
    private readonly kladsService: KladsService,
  ) {}

  @Mutation('createCategory')
  create(
    @Args('createCategoryInput') createCategoryInput: Prisma.CompanyCreateInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query('categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query('category')
  findOne(@Args('id') id: string) {
    return this.categoriesService.findOne({ id });
  }

  @Mutation('updateCategory')
  update(
    @Args('id') id: string,
    @Args('updateCategoryInput') updateCategoryInput: Prisma.CompanyUpdateInput,
  ) {
    return this.categoriesService.update({ id }, updateCategoryInput);
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: string) {
    return this.categoriesService.remove({ id });
  }

  @ResolveField('subCategories', () => [SubCategory])
  subCategories(@Parent() category: Category) {
    return this.subCategortiesService.forCategory(category.id);
  }

  @ResolveField('klads', () => [Klad])
  klads(@Parent() category: Category) {
    return this.kladsService.forCategory(category.id);
  }
}
