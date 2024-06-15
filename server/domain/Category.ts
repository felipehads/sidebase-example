export default class Category {
    public id?: number;
    constructor(public name: string) {
    }
    static fromDatabase(id: number, name: string): Category {
        const category = new Category(name);
        category.id = id;
        return category;
    }
}