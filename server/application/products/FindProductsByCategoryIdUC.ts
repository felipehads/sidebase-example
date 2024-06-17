import Product from "../../domain/Product";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import ProductRepository from "../../repositories/products/ProductRepository";

export default class FindProductsByCategoryIdUC {
    private productRepository: ProductRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.productRepository = factoryRepository.createProductRepository();
    }

    async execute(categoryId?: number): Promise<Product[]> {
        return this.productRepository.findByCategoryId(categoryId);
    }
}