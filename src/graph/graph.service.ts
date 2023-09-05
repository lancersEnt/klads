import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import { Category, Klad, SubCategory } from '@prisma/client';
import { log } from 'console';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class GraphService {
  constructor(
    private prisma: PrismaService,
    private readonly neo4j: Neo4jService,
  ) {}
  async createCategoryNode(category: Category) {
    const queryResult = await this.neo4j.run(
      {
        cypher:
          'create (cat:Category:Interest {id: $id, name:$name}) return cat',
        parameters: {
          id: category.id,
          name: category.name,
        },
      },
      { write: true },
    );
    if (queryResult.records.length === 0) {
      throw new InternalServerErrorException('Could not create user node.');
    }
    if (queryResult.records.length === 1) {
      return 'user node created Created.';
    }
  }

  async createSubCategoryNode(subcategory: SubCategory) {
    const queryResult = await this.neo4j.run(
      {
        cypher: `
          MATCH (cat:Category {id: $categoryId}) 
          CREATE (subcat:SubCategory:Interest {id: $subcategoryId, name: $subcategoryName}) 
          MERGE (subcat)-[:BELONGS_TO]->(cat) 
          RETURN subcat
        `,
        parameters: {
          categoryId: subcategory.categoryId,
          subcategoryId: subcategory.id,
          subcategoryName: subcategory.name,
        },
      },
      { write: true },
    );

    if (queryResult.records.length === 0) {
      throw new InternalServerErrorException(
        'Could not create subcategory node.',
      );
    }

    if (queryResult.records.length === 1) {
      return 'Subcategory node created and linked to category.';
    }
  }

  async createKladNode(klad: Klad) {
    const categoryId = klad.categoryId;
    const subcategoryId = klad.subCategoryId;

    const queryResult = await this.neo4j.run(
      {
        cypher: `
          MATCH (cat:Category {id: $categoryId})
          MATCH (subcategory:SubCategory {id: $subcategoryId})
          CREATE (klad:Klad {id: $kladId, name: $kladName, approved: false})
          MERGE (klad)-[:OF_CATEGORY]->(cat)
          MERGE (klad)-[:OF_SUBCATEGORY]->(subcategory)
          RETURN klad
        `,
        parameters: {
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          kladId: klad.id,
          kladName: klad.name,
        },
      },
      { write: true },
    );

    if (queryResult.records.length === 0) {
      throw new InternalServerErrorException('Could not create klad node.');
    }

    return 'Klad node created.';
  }

  async approveKlad(kladId: string) {
    await this.neo4j.run(
      {
        cypher: `
          MATCH (k:Klad {id: $kladId})
          SET k.approved = $isApproved
          RETURN k
        `,
        parameters: {
          kladId: kladId,
          isApproved: true,
        },
      },
      { write: true },
    );
  }

  async createIntrestRelation(
    userId: string,
    categoryId: string,
    subcategoryId: string,
  ) {
    const queryResult = await this.neo4j.run(
      {
        cypher: `
        MATCH (u:User {id: $user_id})
        MATCH (c:Category {id: $category_id}) 
        MATCH (s:SubCategory {id: $subcategory_id}) 
        
        MERGE (u)-[r:INTERESTED_IN]->(c)
        ON CREATE SET r.score = 1
        ON MATCH SET r.score = r.score + 1
        
        MERGE (u)-[r2:INTERESTED_IN]->(s)
        ON CREATE SET r2.score = 2
        ON MATCH SET r2.score = r2.score + 2
        `,
        parameters: {
          user_id: userId,
          category_id: categoryId,
          subcategory_id: subcategoryId,
        },
      },
      { write: true },
    );
    if (queryResult.summary.counters.updates().relationshipsCreated == 0) {
      return 'Score updated';
    }

    if (queryResult.records.length === 0) {
      throw new InternalServerErrorException('Could not create relation');
    }
  }

  async interestingKlads(userId: string) {
    const queryResult = await this.neo4j.run(
      {
        cypher: `
          MATCH (user:User {id: $user_id})
          MATCH (user)-[interest:INTERESTED_IN]->(interestNode) 
          WHERE (interestNode:Category OR interestNode:SubCategory)
          WITH user, interestNode, interest.score AS interestScore
          MATCH (klad:Klad {approved: true})-[:OF_CATEGORY|:OF_SubCATEGORY]->(interestNode)
          RETURN klad, SUM(interestScore) AS totalInterestScore
          ORDER BY totalInterestScore DESC
        `,
        parameters: {
          user_id: userId,
        },
      },
      { write: true },
    );
    const ids = queryResult.records.map((elem) => {
      log(elem.get('klad'));
      return elem.get('klad').properties.id;
    });

    if (ids.length > 0) {
      const klads = await this.prisma.klad.findMany({
        where: {
          id: { in: ids },
        },
      });
      const sortedKlads = ids.map((id) => klads.find((user) => user.id === id));
      return sortedKlads;
    }
  }

  async recommendedKlads(userId: string) {
    const queryResult = await this.neo4j.run(
      {
        cypher: `
        MATCH (user:User {id: $user_id})
        MATCH (user)-[interest:INTERESTED_IN]->(interestNode) 
        WHERE (interestNode:Category OR interestNode:SubCategory)
        WITH user, interestNode, interest.score AS interestScore
        MATCH (klad:Klad {approved: true})-[:OF_CATEGORY|:OF_SubCATEGORY]->(interestNode)
        RETURN klad, SUM(interestScore) AS totalInterestScore
        ORDER BY totalInterestScore DESC LIMIT 3
        `,
        parameters: {
          user_id: userId,
        },
      },
      { write: true },
    );
    const ids = queryResult.records.map((elem) => {
      log(elem.get('klad'));
      return elem.get('klad').properties.id;
    });

    if (ids.length > 0) {
      const klads = await this.prisma.klad.findMany({
        where: {
          id: { in: ids },
        },
      });
      const sortedKlads = ids.map((id) => klads.find((user) => user.id === id));
      return sortedKlads;
    }
  }
}
