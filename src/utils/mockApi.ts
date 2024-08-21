export const API_URL = 'https://655c7acd25b76d9884fd5a52.mockapi.io/products'
export const API_ITEMS_PER_PAGE_LIMIT = 12

export function createUrl(page: string | number, name: string, sort: string, order: string): string {
    const urlObject = new URL(API_URL)
    urlObject.searchParams.set('page', `${page}`)
    name && urlObject.searchParams.set('name', `${name}`)
    sort && urlObject.searchParams.set('sortBy', `${sort}`)
    order && urlObject.searchParams.set('order', `${order}`)
    return urlObject.toString()
}