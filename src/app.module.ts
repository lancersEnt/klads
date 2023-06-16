import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KladsModule } from './klads/klads.module';
import { PrismaService } from 'prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApprovalsModule } from './approvals/approvals.module';
import { MilestonesModule } from './milestones/milestones.module';
import { InvestmentsModule } from './investments/investments.module';
import { CompaniesModule } from './companies/companies.module';
import { DateTimeResolver } from 'graphql-scalars';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: {
        DateTime: DateTimeResolver,
      },
    }),
    KladsModule,
    ApprovalsModule,
    MilestonesModule,
    InvestmentsModule,
    CompaniesModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
