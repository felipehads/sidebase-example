import Category from "../domain/Category";
import RepositoryFactory from "../repositories/RepositoryFactory";
import CategoryRepository from "../repositories/categories/CategoryRepository";

export default class FindAllCategoriesUC {
    private categoryRepository: CategoryRepository;

    constructor(factoryRepository: RepositoryFactory) {
        this.categoryRepository = factoryRepository.createCategoryRepository();
    }

    async execute(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }
}