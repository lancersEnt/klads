import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { GraphService } from 'src/graph/graph.service';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService, private graph: GraphService) {}
  async create(createSubCategoryInput: Prisma.SubCategoryCreateInput) {
    await this.prisma.category.findUniqueOrThrow({
      where: { id: createSubCategoryInput.categoryId },
    });
    const subcat = await this.prisma.subCategory.create({
      data: createSubCategoryInput,
    });
    this.graph.createSubCategoryNode(subcat);
    return subcat;
  }

  findAll() {
    return this.prisma.subCategory.findMany();
  }

  findOne(uniqueInput: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.SubCategoryWhereUniqueInput,
    updateSubCategoryInput: Prisma.SubCategoryUpdateInput,
  ) {
    return this.prisma.subCategory.update({
      where: uniqueInput,
      data: updateSubCategoryInput,
    });
  }

  remove(uniqueInput: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.delete({
      where: uniqueInput,
    });
  }

  forCategory(id: string) {
    return this.prisma.subCategory.findMany({
      where: {
        categoryId: id,
      },
    });
  }
}
