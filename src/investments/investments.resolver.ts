import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InvestmentsService } from './investments.service';
import { CreateInvestmentInput } from './dto/create-investment.input';
import { UpdateInvestmentInput } from './dto/update-investment.input';

@Resolver('Investment')
export class InvestmentsResolver {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Mutation('createInvestment')
  create(@Args('createInvestmentInput') createInvestmentInput: CreateInvestmentInput) {
    return this.investmentsService.create(createInvestmentInput);
  }

  @Query('investments')
  findAll() {
    return this.investmentsService.findAll();
  }

  @Query('investment')
  findOne(@Args('id') id: number) {
    return this.investmentsService.findOne(id);
  }

  @Mutation('updateInvestment')
  update(@Args('updateInvestmentInput') updateInvestmentInput: UpdateInvestmentInput) {
    return this.investmentsService.update(updateInvestmentInput.id, updateInvestmentInput);
  }

  @Mutation('removeInvestment')
  remove(@Args('id') id: number) {
    return this.investmentsService.remove(id);
  }
}
