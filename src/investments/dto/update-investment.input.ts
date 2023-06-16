import { CreateInvestmentInput } from './create-investment.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvestmentInput extends PartialType(CreateInvestmentInput) {
  id: number;
}
