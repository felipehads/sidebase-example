import { PrismaClient } from "@prisma/client";
import Category from "~/server/domain/Category";
import CategoryRepository from "./CategoryRepository";

export default class CategoryRepositoryDatabase implements CategoryRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async findAll(): Promise<Category[]> {
        const categoriesDatabase = await this.prisma.categories.findMany();
        return categoriesDatabase.map(category => Category.fromDatabase(category.id, category.name));
    }
    async create(category: Category): Promise<void> {
        await this.prisma.categories.create({
            data: {
                name: category.name,
            },
        });
    }
}