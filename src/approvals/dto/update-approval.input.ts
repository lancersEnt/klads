import { CreateApprovalInput } from './create-approval.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateApprovalInput extends PartialType(CreateApprovalInput) {
  id: number;
}
