import { Brand } from "./brand";
import { Category } from "./category";

export class Product{ 
    name!: string;
    slug!: string;
    category!: Category;
    brand!: Brand;
    status!: string;
}