import RepositoryFactory from "../../repositories/RepositoryFactory";
import ProductRepository from "../../repositories/products/ProductRepository";

export default class CreateProductUC {
    private productRepository: ProductRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.productRepository = factoryRepository.createProductRepository();
    }

    async execute(createProductDTO: CreateProductDTO): Promise<void> {
        return this.productRepository.create(createProductDTO);
    }
}

export class CreateProductDTO {
    constructor(readonly name: string, readonly price: number, readonly categoryId: number) { }
}