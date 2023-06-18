import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MilestonesService } from './milestones.service';
import { Prisma } from '@prisma/client';
import { Klad, Milestone } from 'src/graphql';
import { KladsService } from 'src/klads/klads.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver('Milestone')
export class MilestonesResolver {
  constructor(
    private readonly milestonesService: MilestonesService,
    private readonly kladsService: KladsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createMilestones')
  async create(
    @Args('createManyMilestonesInput')
    createManyMilestonesInput: Prisma.MilestoneCreateManyInput,
  ) {
    const { count: milestonesCreated } = await this.milestonesService.create(
      createManyMilestonesInput,
    );
    return { milestonesCreated };
  }

  @UseGuards(JwtAuthGuard)
  @Query('milestones')
  findAll(@Args('kladId') kladId: string) {
    return this.milestonesService.findAllByKlad(kladId);
  }

  @UseGuards(JwtAuthGuard)
  @Query('milestone')
  findOne(@Args('id') id: string) {
    return this.milestonesService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateMilestone')
  update(
    @Args('id') id: string,
    @Args('updateMilestoneInput')
    updateMilestoneInput: Prisma.MilestoneUpdateInput,
  ) {
    return this.milestonesService.update({ id }, updateMilestoneInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeMilestone')
  remove(@Args('id') id: string) {
    return this.milestonesService.remove({ id });
  }

  @ResolveField('klad', () => Klad)
  klad(@Parent() milestone: Milestone) {
    return this.kladsService.findOne({ id: milestone.kladId });
  }
}
