import Category from "../../domain/Category";

export default interface CategoryRepository {
    findAll(): Promise<Category[]>;
    create(category: Category): Promise<void>;
}