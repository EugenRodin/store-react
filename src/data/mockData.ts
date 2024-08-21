import {ProductInterface} from "../types/Product.Interface.ts";

export interface ProductCategoryInterface {
    value: string
    text: string
}

export const PRODUCT_CATEGORIES: ProductCategoryInterface[] = [
    {value: 'Laptops', text: 'Laptops'},
    {value: 'Smartphones', text: 'Smartphones'},
    {value: 'Tablets', text: 'Tablets'},
    {value: 'Accessories', text: 'Accessories'},
    {value: 'Software', text: 'Software'},
    {value: 'Cameras', text: 'Cameras'},
    {value: 'Smartwatches', text: 'Smartwatches'}
]

export const INITIAL_PRODUCT: Partial<ProductInterface> = {
    name: 'AMD Ryzen 9 5950X',
    price: 799,
    description: '16-core, 32-thread unlocked desktop processor',
    category: 'Laptops',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
}

export interface SortByListInterface {
    value: string
    text: string
}

export const SORT_BY_LIST: SortByListInterface[] = [
    {
        value: '',
        text: 'Default'
    },
    {
        value: 'price',
        text: 'Price'
    },
    {
        value: 'name',
        text: 'Name'
    },
    {
        value: 'category',
        text: 'Category'
    }
]

export interface OrderByListInterface {
    value: string
    text: string
}

export const ORDER_BY_LIST = [
    {
        value: 'asc',
        text: 'Ascending'
    },
    {
        value: 'desc',
        text: 'Descending'
    }
]