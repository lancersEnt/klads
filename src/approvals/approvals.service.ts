import { Injectable } from '@nestjs/common';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';

@Injectable()
export class ApprovalsService {
  create(createApprovalInput: CreateApprovalInput) {
    return 'This action adds a new approval';
  }

  findAll() {
    return `This action returns all approvals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} approval`;
  }

  update(id: number, updateApprovalInput: UpdateApprovalInput) {
    return `This action updates a #${id} approval`;
  }

  remove(id: number) {
    return `This action removes a #${id} approval`;
  }
}
