import { Injectable } from '@nestjs/common';
import { CreateInvestmentInput } from './dto/create-investment.input';
import { UpdateInvestmentInput } from './dto/update-investment.input';

@Injectable()
export class InvestmentsService {
  create(createInvestmentInput: CreateInvestmentInput) {
    return 'This action adds a new investment';
  }

  findAll() {
    return `This action returns all investments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investment`;
  }

  update(id: number, updateInvestmentInput: UpdateInvestmentInput) {
    return `This action updates a #${id} investment`;
  }

  remove(id: number) {
    return `This action removes a #${id} investment`;
  }
}
