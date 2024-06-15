import { PrismaClient } from "@prisma/client";
import CategoryRepository from "./categories/CategoryRepository";
import ProductRepository from "./products/ProductRepository";
import CategoryRepositoryDatabase from "./categories/CategoryRepositoryDatabase";
import ProductRepositoryDatabase from "./products/ProductRepositoryDatabase";

export default interface RepositoryFactory {
    createCategoryRepository(): CategoryRepository;
    createProductRepository(): ProductRepository;
}

export class RepositoryFactoryDatabase implements RepositoryFactory {
    constructor(private readonly connection: PrismaClient) { }

    createCategoryRepository(): CategoryRepository {
        return new CategoryRepositoryDatabase(this.connection);
    }
    createProductRepository(): ProductRepository {
        return new ProductRepositoryDatabase(this.connection);
    }
}