import { Module } from '@nestjs/common';
import { KladsModule } from './klads/klads.module';
import { PrismaService } from 'prisma/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MilestonesModule } from './milestones/milestones.module';
import { DateTimeResolver } from 'graphql-scalars';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { AuthModule } from './auth/auth.module';
import { Neo4jModule } from '@nhogs/nestjs-neo4j';
import { GraphService } from './graph/graph.service';

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
    Neo4jModule.forRoot({
      scheme: 'neo4j',
      host: 'localhost',
      port: '7687',
      database: 'myklad',
      username: 'neo4j',
      password: 'test',
      global: true,
    }),
    AuthModule,
    KladsModule,
    MilestonesModule,
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [],
  providers: [PrismaService, GraphService],
})
export class AppModule {}
