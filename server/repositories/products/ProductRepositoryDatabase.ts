import { CreateProductDTO } from "~/server/application/products/CreateProductUC";
import Product from "~/server/domain/Product";
import ProductRepository from "./ProductRepository";
import { PrismaClient } from "@prisma/client";

export default class ProductRepositoryDatabase implements ProductRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async create(product: CreateProductDTO): Promise<void> {
        await this.prisma.products.create({
            data: {
                name: product.name,
                price: product.price,
                categoryId: product.categoryId,
            },
        });
    }
    async findByCategoryId(categoryId?: number): Promise<Product[]> {
        const productsDatabase = await this.prisma.products.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: true
            },
            where: {
                ...(categoryId ? { categoryId } : {}),
            }
        });
        return productsDatabase.map(product => Product.fromDatabase(product.id, product.name, +product.price, product.category));
    }
    async deleteById(id: number): Promise<void> {
        await this.prisma.products.delete({
            where: {
                id,
            },
        });
    }
}