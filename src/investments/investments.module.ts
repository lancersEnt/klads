import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsResolver } from './investments.resolver';

@Module({
  providers: [InvestmentsResolver, InvestmentsService]
})
export class InvestmentsModule {}
