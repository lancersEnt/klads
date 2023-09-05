import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InvestmentService } from './investment.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PageGuard } from 'src/auth/guards/page.guard';
import { Investment, Klad, User } from 'src/graphql';
import { KladsService } from 'src/klads/klads.service';

@Resolver('Investment')
export class InvestmentResolver {
  constructor(
    private readonly investmentService: InvestmentService,
    private readonly kladsService: KladsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createInvestment')
  create(
    @Args('createInvestmentInput')
    createInvestmentInput: Prisma.InvestmentCreateInput,
    @Context() context: any,
  ) {
    const { req: request, res } = context;
    const userId: string = request.user.userId;
    createInvestmentInput.investorId = userId;
    return this.investmentService.create(createInvestmentInput);
  }

  @Query('investment')
  findOne(@Args('id') id: string) {
    return this.investmentService.findOne({ id });
  }

  @ResolveField('investor', () => User)
  investor(@Parent() investment: Investment): any {
    return { __typename: 'User', id: investment.investorId };
  }

  @ResolveField('klad', () => Klad)
  klad(@Parent() investment: Investment) {
    return this.kladsService.findOne({ id: investment.kladId });
  }
}
