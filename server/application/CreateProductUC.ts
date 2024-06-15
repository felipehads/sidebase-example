import RepositoryFactory from "../repositories/RepositoryFactory";
import ProductRepository from "../repositories/products/ProductRepository";

export default class CreateProductUC {
    private productRepository: ProductRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.productRepository = factoryRepository.createProductRepository();
    }

    async execute(name: string, price: number, categoryId: number): Promise<void> {
        return this.productRepository.create(new CreateProductDTO(name, price, categoryId));
    }
}

export class CreateProductDTO {
    constructor(readonly name: string, readonly price: number, readonly categoryId: number) { }
}