import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SubCategoriesService } from './sub-categories.service';
import { Prisma } from '@prisma/client';
import { Category, Klad, SubCategory } from 'src/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { KladsService } from 'src/klads/klads.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('SubCategory')
export class SubCategoriesResolver {
  constructor(
    private readonly subCategoriesService: SubCategoriesService,
    private readonly categoriesService: CategoriesService,
    private readonly kladsService: KladsService,
  ) {}

  @UseGuards(AdminGuard)
  @Mutation('createSubCategory')
  create(
    @Args('createSubCategoryInput')
    createSubCategoryInput: Prisma.SubCategoryCreateInput,
  ) {
    return this.subCategoriesService.create(createSubCategoryInput);
  }

  @UseGuards(AdminGuard)
  @Query('subCategories')
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @UseGuards(AdminGuard)
  @Query('subCategory')
  findOne(@Args('id') id: string) {
    return this.subCategoriesService.findOne({ id });
  }

  @UseGuards(AdminGuard)
  @Mutation('updateSubCategory')
  update(
    @Args('id') id: string,
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: Prisma.SubCategoryUpdateInput,
  ) {
    return this.subCategoriesService.update({ id }, updateSubCategoryInput);
  }

  @UseGuards(AdminGuard)
  @Mutation('removeSubCategory')
  remove(@Args('id') id: string) {
    return this.subCategoriesService.remove({ id });
  }

  @ResolveField('category', () => Category)
  category(@Parent() subCategory: SubCategory) {
    return this.categoriesService.findOne({ id: subCategory.categoryId });
  }

  @ResolveField('klads', () => [Klad])
  klads(@Parent() subCategory: SubCategory) {
    return this.kladsService.forSubCategory(subCategory.id);
  }
}
