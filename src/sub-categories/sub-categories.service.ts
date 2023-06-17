import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SubCategoriesService {
  constructor(private prisma: PrismaService) {}
  create(createSubCategoryInput: Prisma.SubCategoryCreateInput) {
    return this.prisma.subCategory.create({
      data: createSubCategoryInput,
    });
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
