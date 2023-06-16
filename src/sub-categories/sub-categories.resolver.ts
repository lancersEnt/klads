import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';

@Resolver('SubCategory')
export class SubCategoriesResolver {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Mutation('createSubCategory')
  create(@Args('createSubCategoryInput') createSubCategoryInput: CreateSubCategoryInput) {
    return this.subCategoriesService.create(createSubCategoryInput);
  }

  @Query('subCategories')
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Query('subCategory')
  findOne(@Args('id') id: number) {
    return this.subCategoriesService.findOne(id);
  }

  @Mutation('updateSubCategory')
  update(@Args('updateSubCategoryInput') updateSubCategoryInput: UpdateSubCategoryInput) {
    return this.subCategoriesService.update(updateSubCategoryInput.id, updateSubCategoryInput);
  }

  @Mutation('removeSubCategory')
  remove(@Args('id') id: number) {
    return this.subCategoriesService.remove(id);
  }
}
