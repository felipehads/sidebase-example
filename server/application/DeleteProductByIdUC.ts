import RepositoryFactory from "../repositories/RepositoryFactory";
import ProductRepository from "../repositories/products/ProductRepository";

export default class DeleteProductByIdUC {
    private productRepository: ProductRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.productRepository = factoryRepository.createProductRepository();
    }

    async execute(id: number): Promise<void> {
        return this.productRepository.deleteById(id);
    }
}