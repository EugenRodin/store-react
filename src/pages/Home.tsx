import { useFetch } from '../hooks/useFetch.ts'
import { ProductInterface } from '../types/Product.Interface.ts'

const Home = () => {
    const {
        data: products,
        error,
        isLoading
    } = useFetch<ProductInterface>('https://655c7acd25b76d9884fd5a52.mockapi.io/products')

    return (
        <div>
            <h1>Products list page</h1>
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && (
                <ul className="products-list">
                    {!!products.length &&
                        products.map((product: ProductInterface) => (
                            <li key={product.id} className="product-item">
                                <h2 className="product-item__title">{product.name}</h2>
                                <p className="product-item__description">{product.description}</p>
                                <p className="product-item__category">{product.category}</p>
                                <p className="product-item__price">{product.price}</p>
                                <img className="product-item__image" src={product.image} alt={product.name} />
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default Home