import Category from "./Category";

export default class Product {
    public id?: number;
    constructor(public name: string, public price: number, public category: Category) {
    }
    static fromDatabase(id: number, name: string, price: number, category: Category): Product {
        const product = new Product(name, price, category);
        product.id = id;
        return product;
    }
}