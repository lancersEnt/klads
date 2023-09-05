import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../graphql';
import { Investment } from '@prisma/client';
import { InvestmentService } from './investment.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly investmentService: InvestmentService) {}

  @ResolveField('investments')
  investments(@Parent() user: User): Promise<Investment[]> {
    return this.investmentService.forUser(user.id);
  }
}
