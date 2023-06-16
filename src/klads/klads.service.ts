import { Injectable } from '@nestjs/common';
import { CreateKladInput } from './dto/create-klad.input';
import { UpdateKladInput } from './dto/update-klad.input';

@Injectable()
export class KladsService {
  create(createKladInput: CreateKladInput) {
    return 'This action adds a new klad';
  }

  findAll() {
    return `This action returns all klads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} klad`;
  }

  update(id: number, updateKladInput: UpdateKladInput) {
    return `This action updates a #${id} klad`;
  }

  remove(id: number) {
    return `This action removes a #${id} klad`;
  }
}
