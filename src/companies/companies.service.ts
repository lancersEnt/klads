import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  create(createCompanyInput: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: createCompanyInput,
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(uniqueInput: Prisma.CompanyWhereUniqueInput) {
    return this.prisma.company.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.CompanyWhereUniqueInput,
    updateCompanyInput: Prisma.CompanyUpdateInput,
  ) {
    updateCompanyInput.updatedAt = new Date();
    return this.prisma.company.update({
      where: uniqueInput,
      data: updateCompanyInput,
    });
  }

  remove(uniqueInput: Prisma.CompanyWhereUniqueInput) {
    return this.prisma.company.delete({
      where: uniqueInput,
    });
  }
}
