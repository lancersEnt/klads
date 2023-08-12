import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GraphService } from 'src/graph/graph.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService, private graph: GraphService) {}

  async create(createCategoryInput: Prisma.CategoryCreateInput) {
    const cat = await this.prisma.category.create({
      data: createCategoryInput,
    });
    this.graph.createCategoryNode(cat);
    return cat;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(uniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.CategoryWhereUniqueInput,
    updateCategoryInput: Prisma.CategoryUpdateInput,
  ) {
    return this.prisma.category.update({
      where: uniqueInput,
      data: updateCategoryInput,
    });
  }

  remove(uniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.delete({
      where: uniqueInput,
    });
  }
}
