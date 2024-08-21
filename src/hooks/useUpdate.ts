import { ProductInterface } from "../types/Product.Interface.ts"

export const useUpdate = (url: string) => {
    const update = async (product: ProductInterface) => {
        try {
            const response = await fetch(`${url}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }

            const updatedProduct = await response.json()
            return updatedProduct
        } catch (error) {
            console.error('Failed to update product:', error)
            throw error;
        }
    }

    return { update, error: null }
}