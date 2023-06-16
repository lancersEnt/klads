import { Module } from '@nestjs/common';
import { KladsService } from './klads.service';
import { KladsResolver } from './klads.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [KladsResolver, KladsService, PrismaService],
})
export class KladsModule {}
