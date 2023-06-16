import { Module } from '@nestjs/common';
import { ApprovalsService } from './approvals.service';
import { ApprovalsResolver } from './approvals.resolver';

@Module({
  providers: [ApprovalsResolver, ApprovalsService]
})
export class ApprovalsModule {}
