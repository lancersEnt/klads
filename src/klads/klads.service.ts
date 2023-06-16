import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class KladsService {
  constructor(private prisma: PrismaService) {}
  create(createKladInput: Prisma.KladCreateInput) {
    return this.prisma.klad.create({
      data: createKladInput,
    });
  }

  findAll() {
    return this.prisma.klad.findMany();
  }

  findOne(uniqueInput: Prisma.KladWhereUniqueInput) {
    return this.prisma.klad.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.KladWhereUniqueInput,
    updateKladInput: Prisma.KladUpdateInput,
  ) {
    return this.prisma.klad.update({
      where: uniqueInput,
      data: updateKladInput,
    });
  }

  remove(uniqueInput: Prisma.KladWhereUniqueInput) {
    return this.prisma.klad.delete({
      where: uniqueInput,
    });
  }
}
