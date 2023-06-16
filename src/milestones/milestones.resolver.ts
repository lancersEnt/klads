import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneInput } from './dto/create-milestone.input';
import { UpdateMilestoneInput } from './dto/update-milestone.input';

@Resolver('Milestone')
export class MilestonesResolver {
  constructor(private readonly milestonesService: MilestonesService) {}

  @Mutation('createMilestone')
  create(@Args('createMilestoneInput') createMilestoneInput: CreateMilestoneInput) {
    return this.milestonesService.create(createMilestoneInput);
  }

  @Query('milestones')
  findAll() {
    return this.milestonesService.findAll();
  }

  @Query('milestone')
  findOne(@Args('id') id: number) {
    return this.milestonesService.findOne(id);
  }

  @Mutation('updateMilestone')
  update(@Args('updateMilestoneInput') updateMilestoneInput: UpdateMilestoneInput) {
    return this.milestonesService.update(updateMilestoneInput.id, updateMilestoneInput);
  }

  @Mutation('removeMilestone')
  remove(@Args('id') id: number) {
    return this.milestonesService.remove(id);
  }
}
