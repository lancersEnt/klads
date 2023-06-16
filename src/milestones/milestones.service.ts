import { Injectable } from '@nestjs/common';
import { CreateMilestoneInput } from './dto/create-milestone.input';
import { UpdateMilestoneInput } from './dto/update-milestone.input';

@Injectable()
export class MilestonesService {
  create(createMilestoneInput: CreateMilestoneInput) {
    return 'This action adds a new milestone';
  }

  findAll() {
    return `This action returns all milestones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} milestone`;
  }

  update(id: number, updateMilestoneInput: UpdateMilestoneInput) {
    return `This action updates a #${id} milestone`;
  }

  remove(id: number) {
    return `This action removes a #${id} milestone`;
  }
}
