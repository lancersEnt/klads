import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../graphql';
import { KladsService } from './klads.service';
import { Klad } from '@prisma/client';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly kladsService: KladsService) {}

  @ResolveField('klads')
  klads(@Parent() user: User): Promise<Klad[]> {
    return this.kladsService.forUser(user.id);
  }
}
