import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KladsService } from './klads.service';
import { CreateKladInput } from './dto/create-klad.input';
import { UpdateKladInput } from './dto/update-klad.input';

@Resolver('Klad')
export class KladsResolver {
  constructor(private readonly kladsService: KladsService) {}

  @Mutation('createKlad')
  create(@Args('createKladInput') createKladInput: CreateKladInput) {
    return this.kladsService.create(createKladInput);
  }

  @Query('klads')
  findAll() {
    return this.kladsService.findAll();
  }

  @Query('klad')
  findOne(@Args('id') id: number) {
    return this.kladsService.findOne(id);
  }

  @Mutation('updateKlad')
  update(@Args('updateKladInput') updateKladInput: UpdateKladInput) {
    return this.kladsService.update(updateKladInput.id, updateKladInput);
  }

  @Mutation('removeKlad')
  remove(@Args('id') id: number) {
    return this.kladsService.remove(id);
  }
}
