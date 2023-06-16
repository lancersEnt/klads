import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryInput: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data: createCategoryInput,
    });
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
    updateCategoryInput: Prisma.CompanyUpdateInput,
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
