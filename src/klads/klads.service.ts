import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { GraphService } from 'src/graph/graph.service';

@Injectable()
export class KladsService {
  constructor(private prisma: PrismaService, private graph: GraphService) {}
  async create(createKladInput: Prisma.KladCreateInput) {
    await this.prisma.category.findUniqueOrThrow({
      where: { id: createKladInput.categoryId },
    });
    await this.prisma.subCategory.findUniqueOrThrow({
      where: { id: createKladInput.subCategoryId },
    });

    const klad = await this.prisma.klad.create({
      data: createKladInput,
    });

    log(klad);

    this.graph.createKladNode(klad);

    return klad;
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

  forCategory(id: string) {
    return this.prisma.klad.findMany({
      where: {
        categoryId: id,
      },
    });
  }

  forSubCategory(id: string) {
    return this.prisma.klad.findMany({
      where: {
        subCategoryId: id,
      },
    });
  }

  forUser(id: string) {
    return this.prisma.klad.findMany({
      where: {
        ownerId: id,
      },
    });
  }
}
