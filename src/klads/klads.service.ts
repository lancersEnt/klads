import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { GraphService } from 'src/graph/graph.service';
import { KafkaService } from 'src/kafka/kafka.service';
import capitalize from 'src/utils/capitalize';
import getExperts from 'src/utils/getExperts';
import getSender from 'src/utils/getSender';
import { Notification } from 'src/utils/interfaces/notification.interface';

@Injectable()
export class KladsService {
  constructor(
    private kafka: KafkaService,
    private prisma: PrismaService,
    private graph: GraphService,
  ) {}
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

  async findAll(userId: string) {
    return await this.graph.interestingKlads(userId);
  }

  async recommendedKlads(userId: string) {
    return await this.graph.recommendedKlads(userId);
  }

  myKlads(userId: string) {
    return this.prisma.klad.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  submittedKlads() {
    return this.prisma.klad.findMany({
      where: {
        isDraft: true,
        inReview: true,
      },
    });
  }

  approvedKlads() {
    return this.prisma.klad.findMany({
      where: {
        isDraft: false,
        inReview: false,
        isApproved: true,
      },
    });
  }

  findOne(uniqueInput: Prisma.KladWhereUniqueInput) {
    if (uniqueInput.id !== null)
      return this.prisma.klad.findUnique({
        where: uniqueInput,
      });
    else return null;
  }

  liveKlad(id: string) {
    return this.prisma.klad.findFirstOrThrow({
      where: { id, isApproved: true },
    });
  }

  async update(
    uniqueInput: Prisma.KladWhereUniqueInput,
    updateKladInput: Prisma.KladUpdateInput,
  ) {
    const klad = await this.prisma.klad.update({
      where: uniqueInput,
      data: updateKladInput,
    });
    if (updateKladInput.isApproved === true) this.graph.approveKlad(klad.id);
    if (updateKladInput.inReview === true) {
      //send notification to all experts
      const experts = await getExperts();
      experts.forEach((expert) => {
        const projectSubmit: Notification = {
          payload: {
            title: `new project submit - ${klad.id}`,
            body: `un nouveau klad est soumis`,
            createdBy: klad.ownerId,
            targetUserId: expert.id,
            action: `/expert-hub/review/${klad.id}`,
          },
        };

        this.kafka.produce('notifications', JSON.stringify(projectSubmit));
      });
    }
    return klad;
  }

  filtredKlads(filter: Filter) {
    const where = {
      isApproved: true,
    };

    if (
      (filter.categories && filter.categories.length > 0) ||
      (filter.subCategories && filter.subCategories.length > 0)
    ) {
      where['OR'] = [
        { categoryId: { in: filter.categories } },
        { subCategoryId: { in: filter.subCategories } },
      ];
    }

    return this.prisma.klad.findMany({
      where,
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
        isApproved: true,
      },
    });
  }
}
