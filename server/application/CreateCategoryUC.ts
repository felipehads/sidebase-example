import Category from "../domain/Category";
import RepositoryFactory from "../repositories/RepositoryFactory";
import CategoryRepository from "../repositories/categories/CategoryRepository";

export default class CreateCategoryUC {
    private categoryRepository: CategoryRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.categoryRepository = factoryRepository.createCategoryRepository();
    }

    async execute(name: string): Promise<void> {
        return this.categoryRepository.create(new Category(name));
    }
}   