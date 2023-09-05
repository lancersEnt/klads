import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MilestonesService {
  constructor(private prisma: PrismaService) {}

  create(createManyMilestonesInput: Prisma.MilestoneCreateManyInput) {
    return this.prisma.milestone.createMany({
      data: createManyMilestonesInput,
    });
  }

  findAllByKlad(kladId: string) {
    return this.prisma.milestone.findMany({
      where: { kladId },
    });
  }

  findOne(uniqueInput: Prisma.MilestoneWhereUniqueInput) {
    return this.prisma.milestone.findUnique({
      where: uniqueInput,
    });
  }

  update(
    uniqueInput: Prisma.MilestoneWhereUniqueInput,
    updateMilestoneInput: Prisma.MilestoneUpdateInput,
  ) {
    return this.prisma.milestone.update({
      where: uniqueInput,
      data: updateMilestoneInput,
    });
  }

  remove(uniqueInput: Prisma.MilestoneWhereUniqueInput) {
    return this.prisma.milestone.delete({
      where: uniqueInput,
    });
  }

  forKlad(id: string) {
    return this.prisma.milestone.findMany({
      where: {
        kladId: id,
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  }
}
