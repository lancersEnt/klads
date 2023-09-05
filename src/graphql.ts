
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCategoryInput {
    name: string;
    createdAt?: Nullable<DateTime>;
}

export class UpdateCategoryInput {
    name?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class CreateInvestmentInput {
    partsPurchased: number;
    kladId: string;
    investorId: string;
}

export class CreateKladInput {
    name: string;
    categoryId: string;
    subCategoryId: string;
    description: string;
    tags?: Nullable<Nullable<string>[]>;
    budgetNeeded: number;
    partPrice: number;
    minPartsPurchasable: number;
    maxPartsPurchasable: number;
    createdAt?: Nullable<DateTime>;
}

export class UpdateKladInput {
    pictureUrl?: Nullable<string>;
    coverPictureUrl?: Nullable<string>;
    isApproved?: Nullable<boolean>;
    isRejected?: Nullable<boolean>;
    archivedMessagesUrl?: Nullable<string>;
    isDraft?: Nullable<boolean>;
    inReview?: Nullable<boolean>;
    name?: Nullable<string>;
    categoryId?: Nullable<string>;
    subCategoryId?: Nullable<string>;
    description?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    budgetNeeded?: Nullable<number>;
    budgetCollected?: Nullable<number>;
    partPrice?: Nullable<number>;
    minPartsPurchasable?: Nullable<number>;
    maxPartsPurchasable?: Nullable<number>;
    updatedAt?: Nullable<DateTime>;
    pictures?: Nullable<Nullable<string>[]>;
    videos?: Nullable<Nullable<string>[]>;
    documents?: Nullable<Nullable<string>[]>;
}

export class Filter {
    categories?: Nullable<Nullable<string>[]>;
    subCategories?: Nullable<Nullable<string>[]>;
}

export class CreateMilestoneInput {
    kladId: string;
    name: string;
    dueDate: DateTime;
    createdAt?: Nullable<DateTime>;
}

export class UpdateMilestoneInput {
    kladId?: Nullable<string>;
    name?: Nullable<string>;
    dueDate?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
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

export class Category {
    id: string;
    name: string;
    subCategories?: Nullable<SubCategory[]>;
    klads?: Nullable<Nullable<Klad>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract categories(): Nullable<Category>[] | Promise<Nullable<Category>[]>;

    abstract category(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract investment(id: string): Nullable<Investment> | Promise<Nullable<Investment>>;

    abstract klads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract filtredKlads(filter?: Nullable<Filter>): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract recommendedKlads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract submittedKlads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract myKlads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract approvedKlads(): Nullable<Klad>[] | Promise<Nullable<Klad>[]>;

    abstract klad(id: string): Nullable<Klad> | Promise<Nullable<Klad>>;

    abstract liveKlad(id: string): Nullable<Klad> | Promise<Nullable<Klad>>;

    abstract milestones(kladId?: Nullable<string>): Nullable<Milestone>[] | Promise<Nullable<Milestone>[]>;

    abstract milestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract subCategories(): Nullable<SubCategory>[] | Promise<Nullable<SubCategory>[]>;

    abstract subCategory(id: string): Nullable<SubCategory> | Promise<Nullable<SubCategory>>;
}

export abstract class IMutation {
    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract removeCategory(id: string): Nullable<Category> | Promise<Nullable<Category>>;

    abstract createInvestment(createInvestmentInput?: Nullable<CreateInvestmentInput>): Investment | Promise<Investment>;

    abstract createKlad(createKladInput: CreateKladInput): Klad | Promise<Klad>;

    abstract updateKlad(id: string, updateKladInput: UpdateKladInput): Klad | Promise<Klad>;

    abstract removeKlad(id: string): Nullable<Klad> | Promise<Nullable<Klad>>;

    abstract createMilestones(createManyMilestonesInput: Nullable<CreateMilestoneInput>[]): CreateManyMilestonesOutput | Promise<CreateManyMilestonesOutput>;

    abstract updateMilestone(id: string, updateMilestoneInput: UpdateMilestoneInput): Milestone | Promise<Milestone>;

    abstract removeMilestone(id: string): Nullable<Milestone> | Promise<Nullable<Milestone>>;

    abstract createSubCategory(createSubCategoryInput: CreateSubCategoryInput): SubCategory | Promise<SubCategory>;

    abstract updateSubCategory(id: string, updateSubCategoryInput: UpdateSubCategoryInput): SubCategory | Promise<SubCategory>;

    abstract removeSubCategory(id: string): Nullable<SubCategory> | Promise<Nullable<SubCategory>>;
}

export class Investment {
    id: string;
    partsPurchased: number;
    kladId: string;
    investorId: string;
    investor?: Nullable<User>;
    klad?: Nullable<Klad>;
    createdAt?: Nullable<DateTime>;
}

export class Klad {
    id: string;
    name: string;
    description: string;
    pictureUrl?: Nullable<string>;
    coverPictureUrl?: Nullable<string>;
    ownerId: string;
    categoryId: string;
    subCategoryId: string;
    isDraft: boolean;
    inReview?: Nullable<boolean>;
    isApproved?: Nullable<boolean>;
    isRejected?: Nullable<boolean>;
    archivedMessagesUrl?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    budgetNeeded: number;
    budgetCollected: number;
    partPrice: number;
    minPartsPurchasable: number;
    maxPartsPurchasable: number;
    milestones?: Nullable<Nullable<Milestone>[]>;
    investments?: Nullable<Nullable<Investment>[]>;
    pictures?: Nullable<Nullable<string>[]>;
    documents?: Nullable<Nullable<string>[]>;
    videos?: Nullable<Nullable<string>[]>;
    owner?: Nullable<User>;
    category?: Nullable<Category>;
    subCategory?: Nullable<SubCategory>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class Milestone {
    id: string;
    name: string;
    dueDate: DateTime;
    kladId: string;
    klad?: Nullable<Klad>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class CreateManyMilestonesOutput {
    milestonesCreated: number;
}

export class SubCategory {
    id: string;
    name: string;
    categoryId: string;
    category?: Nullable<Category>;
    klads?: Nullable<Nullable<Klad>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class User {
    id: string;
    investments?: Nullable<Nullable<Investment>[]>;
    klads?: Nullable<Nullable<Klad>[]>;
}

export type DateTime = any;
type Nullable<T> = T | null;
