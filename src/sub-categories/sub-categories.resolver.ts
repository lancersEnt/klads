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
import { Category, SubCategory } from 'src/graphql';
import { CategoriesService } from 'src/categories/categories.service';

@Resolver('SubCategory')
export class SubCategoriesResolver {
  constructor(
    private readonly subCategoriesService: SubCategoriesService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Mutation('createSubCategory')
  create(
    @Args('createSubCategoryInput')
    createSubCategoryInput: Prisma.SubCategoryCreateInput,
  ) {
    return this.subCategoriesService.create(createSubCategoryInput);
  }

  @Query('subCategories')
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Query('subCategory')
  findOne(@Args('id') id: string) {
    return this.subCategoriesService.findOne({ id });
  }

  @Mutation('updateSubCategory')
  update(
    @Args('id') id: string,
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: Prisma.SubCategoryUpdateInput,
  ) {
    return this.subCategoriesService.update({ id }, updateSubCategoryInput);
  }

  @Mutation('removeSubCategory')
  remove(@Args('id') id: string) {
    return this.subCategoriesService.remove({ id });
  }

  @ResolveField('category', () => Category)
  category(@Parent() subCategory: SubCategory) {
    return this.categoriesService.findOne({ id: subCategory.categoryId });
  }
}
