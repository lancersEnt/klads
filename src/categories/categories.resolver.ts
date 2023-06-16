import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

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
}
