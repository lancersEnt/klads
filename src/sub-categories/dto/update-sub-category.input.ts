import { CreateSubCategoryInput } from './create-sub-category.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSubCategoryInput extends PartialType(CreateSubCategoryInput) {
  id: number;
}
