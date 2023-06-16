import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KladsService } from './klads.service';
import { Prisma } from '@prisma/client';

@Resolver('Klad')
export class KladsResolver {
  constructor(private readonly kladsService: KladsService) {}

  @Mutation('createKlad')
  create(@Args('createKladInput') createKladInput: Prisma.KladCreateInput) {
    return this.kladsService.create(createKladInput);
  }

  @Query('klads')
  findAll() {
    return this.kladsService.findAll();
  }

  @Query('klad')
  findOne(@Args('id') id: string) {
    return this.kladsService.findOne({ id });
  }

  @Mutation('updateKlad')
  update(
    @Args('id') id: string,
    @Args('updateKladInput') updateKladInput: Prisma.KladUpdateInput,
  ) {
    return this.kladsService.update({ id }, updateKladInput);
  }

  @Mutation('removeKlad')
  remove(@Args('id') id: string) {
    return this.kladsService.remove({ id });
  }
}
