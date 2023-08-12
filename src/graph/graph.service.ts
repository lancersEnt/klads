import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import { Category, Klad, SubCategory } from '@prisma/client';
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
          CREATE (klad:Klad {id: $kladId, name: $kladName})
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
}
