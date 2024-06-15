import { CreateProductDTO } from "../../application/CreateProductUC";
import Product from "../../domain/Product";

export default interface ProductRepository {
    create(product: CreateProductDTO): Promise<void>;
    findByCategoryId(categoryId?: number): Promise<Product[]>;
    deleteById(id: number): Promise<void>;
}