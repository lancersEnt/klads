/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateApprovalInput {
    exampleField?: Nullable<number>;
}

export class UpdateApprovalInput {
    id: number;
}

export class CreateCategoryInput {
    name: string;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCategoryInput {
    name: string;
    updatedAt?: Nullable<DateTime>;
}

export class CreateCompanyInput {
    name: string;
    adress: string;
    city: string;
    state: string;
    country: string;
    email: string;
    website?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCompanyInput {
    name?: Nullable<string>;
    adress?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    country?: Nullable<string>;
    email?: Nullable<string>;
    website?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class CreateInvestmentInput {
    exampleField?: Nullable<number>;
}

export class UpdateInvestmentInput {
    id: number;
}

export class CreateKladInput {
    exampleField?: Nullable<string>;
}

export class UpdateKladInput {
    id?: Nullable<string>;
}

export class CreateMilestoneInput {
    exampleField?: Nullable<number>;
}

export class UpdateMilestoneInput {
    id: number;
}

export class CreateSubCategoryInput {
    name: string;
    categoryId: string;
    createdAt?: Nullable<DateTime>;
}

export class UpdateSubCategoryInput {
    name: string;
    categoryId: string;
    updatedAt?: Nullable<DateTime>;
}

export class Approval {
    exampleField?: Nullable<number>;
}

export abstract class IQuery {
    abstract approvals(): Nullable<Approval>[] | Promise<Nullable<Approval>[]>;

    abstract approval(id: number): Nullable<Approval> | Promise<Nullable<Approval>>;

    abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract companies(): Nullable<Company>[] | Promise<Nullable<Company>[]>;

    abstract company(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract investments(): Nullable<Investment>[] | Promise<Nullable<Investment>[]>;

    abstract investment(id: number): Nullable<Investment> | Promise<Nullable<Investment>>;

    abstract klads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract klad(id: string): Nullable<Klad> | Promise<Nullable<Klad>>;

    abstract milestones(): Nullable<Milestone>[] | Promise<Nullable<Milestone>[]>;

    abstract milestone(id: number): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract subCategories(): Nullable<SubCategory>[] | Promise<Nullable<SubCategory>[]>;

    abstract subCategory(id: string): Nullable<SubCategory> | Promise<Nullable<SubCategory>>;
}

export abstract class IMutation {
    abstract createApproval(createApprovalInput: CreateApprovalInput): Approval | Promise<Approval>;

    abstract updateApproval(updateApprovalInput: UpdateApprovalInput): Approval | Promise<Approval>;

    abstract removeApproval(id: number): Nullable<Approval> | Promise<Nullable<Approval>>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createCompany(createCompanyInput: CreateCompanyInput): Company | Promise<Company>;

    abstract updateCompany(id: string, updateCompanyInput: UpdateCompanyInput): Company | Promise<Company>;

    abstract removeCompany(id: string): Nullable<Company> | Promise<Nullable<Company>>;

    abstract createInvestment(createInvestmentInput: CreateInvestmentInput): Investment | Promise<Investment>;

    abstract updateInvestment(updateInvestmentInput: UpdateInvestmentInput): Investment | Promise<Investment>;

    abstract removeInvestment(id: number): Nullable<Investment> | Promise<Nullable<Investment>>;

    abstract createKlad(createKladInput: CreateKladInput): Klad | Promise<Klad>;

    abstract updateKlad(updateKladInput: UpdateKladInput): Klad | Promise<Klad>;

    abstract removeKlad(id: string): Nullable<Klad> | Promise<Nullable<Klad>>;

    abstract createMilestone(createMilestoneInput: CreateMilestoneInput): Milestone | Promise<Milestone>;

    abstract updateMilestone(updateMilestoneInput: UpdateMilestoneInput): Milestone | Promise<Milestone>;

    abstract removeMilestone(id: number): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract createSubCategory(createSubCategoryInput: CreateSubCategoryInput): SubCategory | Promise<SubCategory>;

    abstract updateSubCategory(id: string, updateSubCategoryInput: UpdateSubCategoryInput): SubCategory | Promise<SubCategory>;

    abstract removeSubCategory(id: string): Nullable<SubCategory> | Promise<Nullable<SubCategory>>;
}

export class Category {
    id: string;
    name: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    klads?: Nullable<Klad[]>;
    subCategories?: Nullable<SubCategory[]>;
}

export class Company {
    id: string;
    name: string;
    adress: string;
    city: string;
    state: string;
    country: string;
    email: string;
    website?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
    klads?: Nullable<Klad[]>;
}

export class Investment {
    exampleField?: Nullable<number>;
}

export class Klad {
    id: string;
    ownerId: string;
    isApproved: boolean;
    isRejected: boolean;
    name: string;
    categoryId: string;
    subCategoryId: string;
    description: string;
    tags?: Nullable<Nullable<string>[]>;
    CompanyId: string;
    budgetNeeded: number;
    budgetCollected: number;
    partPrice: number;
    minPartsPurchasable: number;
    maxPartsPurchasable: number;
    owner?: Nullable<User>;
    category?: Nullable<Category>;
    subCategory?: Nullable<SubCategory>;
    company?: Nullable<Company>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class SubCategory {
    id: string;
    klads?: Nullable<Klad[]>;
    name: string;
    categoryId: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class Milestone {
    exampleField?: Nullable<number>;
}

export class User {
    id: string;
    klads?: Nullable<Klad[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
