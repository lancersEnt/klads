import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';
import { GraphService } from 'src/graph/graph.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Notification } from 'src/utils/interfaces/notification.interface';

@Injectable()
export class InvestmentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly graph: GraphService,
    private readonly kafka: KafkaService,
  ) {}

  async create(createInvestmentInput: Prisma.InvestmentCreateInput) {
    const klad = await this.prisma.klad.findUnique({
      where: { id: createInvestmentInput.kladId },
    });
    await this.prisma.klad.update({
      where: { id: createInvestmentInput.kladId },
      data: {
        budgetCollected:
          createInvestmentInput.partsPurchased * klad.partPrice +
          klad.budgetCollected,
      },
    });
    const rr = await this.graph.createIntrestRelation(
      createInvestmentInput.investorId,
      klad.categoryId,
      klad.subCategoryId,
    );
    log(rr);
    const investment = await this.prisma.investment.findFirst({
      where: {
        investorId: createInvestmentInput.investorId,
        kladId: createInvestmentInput.kladId,
      },
    });
    if (investment) {
      const investmentNotification: Notification = {
        payload: {
          title: `new investment - ${investment.id}`,
          body: `Votre klad à un nouveau investissement`,
          createdBy: investment.investorId,
          targetUserId: klad.ownerId,
          action: `/klad/${klad.id}`,
        },
      };
      this.kafka.produce(
        'notifications',
        JSON.stringify(investmentNotification),
      );
      return this.prisma.investment.update({
        where: {
          id: investment.id,
        },
        data: {
          partsPurchased:
            investment.partsPurchased + createInvestmentInput.partsPurchased,
        },
      });
    }
    const investmentNotification: Notification = {
      payload: {
        title: `new investment - ${investment.id}`,
        body: `Votre klad à un nouveau investissement`,
        createdBy: investment.investorId,
        targetUserId: klad.ownerId,
        action: `/klad/${klad.id}`,
      },
    };
    this.kafka.produce('notifications', JSON.stringify(investmentNotification));

    return this.prisma.investment.create({
      data: createInvestmentInput,
    });
  }

  findOne(uniqueInput: Prisma.InvestmentWhereUniqueInput) {
    return this.prisma.investment.findUnique({
      where: uniqueInput,
    });
  }

  forUser(id: string) {
    return this.prisma.investment.findMany({
      where: {
        investorId: id,
      },
    });
  }

  forKlad(id: string) {
    return this.prisma.investment.findMany({
      where: {
        kladId: id,
      },
    });
  }
}
