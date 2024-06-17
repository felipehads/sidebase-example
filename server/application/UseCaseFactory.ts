import RepositoryFactory from "../repositories/RepositoryFactory";
import CreateCategoryUC from "./categories/CreateCategoryUC";
import FindAllCategoriesUC from "./categories/FindAllCategoriesUC";
import CreateProductUC from "./products/CreateProductUC";
import DeleteProductByIdUC from "./products/DeleteProductByIdUC";
import FindProductsByCategoryIdUC from "./products/FindProductsByCategoryIdUC";

export default interface UseCaseFactory {
    createCategory(): CreateCategoryUC;
    createProduct(): CreateProductUC;
    findAllCategories(): FindAllCategoriesUC;
    findProductsByCategoryId(categoryId: number): FindProductsByCategoryIdUC;
    deleteProductById(productId: number): DeleteProductByIdUC;
}

export class UseCaseFactoryDatabase implements UseCaseFactory {
    static instance: UseCaseFactoryDatabase;

    private createCategoryUC: CreateCategoryUC;
    private createProductUC: CreateProductUC;
    private findAllCategoriesUC: FindAllCategoriesUC;
    private findProductsByCategoryIdUC: FindProductsByCategoryIdUC;
    private deleteProductByIdUC: DeleteProductByIdUC;

    private constructor(private readonly repositoryFactory: RepositoryFactory) {
        this.createCategoryUC = new CreateCategoryUC(this.repositoryFactory);
        this.createProductUC = new CreateProductUC(this.repositoryFactory);
        this.findAllCategoriesUC = new FindAllCategoriesUC(this.repositoryFactory);
        this.findProductsByCategoryIdUC = new FindProductsByCategoryIdUC(this.repositoryFactory);
        this.deleteProductByIdUC = new DeleteProductByIdUC(this.repositoryFactory);
    }

    static getInstance(repositoryFactory: RepositoryFactory): UseCaseFactoryDatabase {
        if (!UseCaseFactoryDatabase.instance) {
            UseCaseFactoryDatabase.instance = new UseCaseFactoryDatabase(repositoryFactory);
        }
        return UseCaseFactoryDatabase.instance;
    }

    findAllCategories(): FindAllCategoriesUC {
        return this.findAllCategoriesUC;
    }
    findProductsByCategoryId(): FindProductsByCategoryIdUC {
        return this.findProductsByCategoryIdUC;
    }
    deleteProductById(): DeleteProductByIdUC {
        return this.deleteProductByIdUC;
    }
    createCategory(): CreateCategoryUC {
        return this.createCategoryUC;
    }

    createProduct(): CreateProductUC {
        return this.createProductUC;
    }
}