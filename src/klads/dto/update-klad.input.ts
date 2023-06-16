import { CreateKladInput } from './create-klad.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateKladInput extends PartialType(CreateKladInput) {
  id: number;
}
