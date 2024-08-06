import {ProductInterface} from "../types/Product.Interface.ts";

export const PRODUCT_CATEGORIES: string[] = [
    "Laptops",
    "Smartphones",
    "Tablets",
    "Accessories",
    "Software",
    "Cameras",
    "Smartwatches",
]

export const INITIAL_PRODUCT: Partial<ProductInterface> = {
    name: 'AMD Ryzen 9 5950X',
    price: 799,
    description: '16-core, 32-thread unlocked desktop processor',
    category: 'Laptops',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
}