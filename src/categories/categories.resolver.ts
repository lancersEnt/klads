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
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Category')
export class CategoriesResolver {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly subCategortiesService: SubCategoriesService,
    private readonly kladsService: KladsService,
  ) {}

  @UseGuards(AdminGuard)
  @Mutation('createCategory')
  create(
    @Args('createCategoryInput')
    createCategoryInput: Prisma.CategoryCreateInput,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query('categories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Query('category')
  findOne(@Args('id') id: string) {
    return this.categoriesService.findOne({ id });
  }

  @UseGuards(AdminGuard)
  @Mutation('updateCategory')
  update(
    @Args('id') id: string,
    @Args('updateCategoryInput')
    updateCategoryInput: Prisma.CategoryCreateInput,
  ) {
    return this.categoriesService.update({ id }, updateCategoryInput);
  }

  @UseGuards(AdminGuard)
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
