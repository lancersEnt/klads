import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApprovalsService } from './approvals.service';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';

@Resolver('Approval')
export class ApprovalsResolver {
  constructor(private readonly approvalsService: ApprovalsService) {}

  @Mutation('createApproval')
  create(@Args('createApprovalInput') createApprovalInput: CreateApprovalInput) {
    return this.approvalsService.create(createApprovalInput);
  }

  @Query('approvals')
  findAll() {
    return this.approvalsService.findAll();
  }

  @Query('approval')
  findOne(@Args('id') id: number) {
    return this.approvalsService.findOne(id);
  }

  @Mutation('updateApproval')
  update(@Args('updateApprovalInput') updateApprovalInput: UpdateApprovalInput) {
    return this.approvalsService.update(updateApprovalInput.id, updateApprovalInput);
  }

  @Mutation('removeApproval')
  remove(@Args('id') id: number) {
    return this.approvalsService.remove(id);
  }
}
