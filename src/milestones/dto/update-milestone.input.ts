import { CreateMilestoneInput } from './create-milestone.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMilestoneInput extends PartialType(CreateMilestoneInput) {
  id: number;
}
