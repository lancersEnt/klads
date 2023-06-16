import { Injectable } from '@nestjs/common';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';

@Injectable()
export class SubCategoriesService {
  create(createSubCategoryInput: CreateSubCategoryInput) {
    return 'This action adds a new subCategory';
  }

  findAll() {
    return `This action returns all subCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCategory`;
  }

  update(id: number, updateSubCategoryInput: UpdateSubCategoryInput) {
    return `This action updates a #${id} subCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
