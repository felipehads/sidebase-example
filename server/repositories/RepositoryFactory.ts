import { PrismaClient } from "@prisma/client";
import CategoryRepository from "./categories/CategoryRepository";
import CategoryRepositoryDatabase from "./categories/CategoryRepositoryDatabase";
import ProductRepository from "./products/ProductRepository";
import ProductRepositoryDatabase from "./products/ProductRepositoryDatabase";

export default interface RepositoryFactory {
    createCategoryRepository(): CategoryRepository;
    createProductRepository(): ProductRepository;
}

export class RepositoryFactoryDatabase implements RepositoryFactory {
    static instance: RepositoryFactoryDatabase;

    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;

    private constructor(private readonly connection: PrismaClient) {
        this.categoryRepository = new CategoryRepositoryDatabase(this.connection);
        this.productRepository = new ProductRepositoryDatabase(this.connection);
    }

    static getInstance(connection: PrismaClient): RepositoryFactoryDatabase {
        if (!RepositoryFactoryDatabase.instance) {
            RepositoryFactoryDatabase.instance = new RepositoryFactoryDatabase(connection);
        }
        return RepositoryFactoryDatabase.instance;
    }

    createCategoryRepository(): CategoryRepository {
        return this.categoryRepository;
    }
    createProductRepository(): ProductRepository {
        return this.productRepository;
    }
}