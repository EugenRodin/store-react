import { useFetch } from '../hooks/useFetch.ts'
import { ProductInterface } from '../types/Product.Interface.ts'
import {API_ITEMS_PER_PAGE_LIMIT, createUrl} from "../utils/mockApi.ts";
import {useState} from "react";
import Product from "../components/Product.tsx";
import AddProductutton from "../components/AddProductButton.tsx";

const Home = () => {
    const [page, setPage] = useState<number>(1)
    const [reload, setReload] = useState('0')
    const {
        data: products,
        error,
        isLoading
    } = useFetch<ProductInterface>(createUrl(1), undefined , reload)

    return (
        <div>
            <h1>Products list page</h1>
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && (
                <div className="content">
                    <div className="buttons-group">
                        <AddProductutton />
                        <div className="pagination">
                            <button
                                className="pagination__btn"
                                disabled={page === 1} onClick={() => setPage(prevState => prevState - 1)}
                            >
                                Previous page
                            </button>
                            <button
                                className="pagination__btn"
                                disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                                onClick={() => setPage(prevState => prevState + 1)}
                            >
                                Next page
                            </button>
                        </div>
                    </div>

                    <ul className="products-list">
                        {!!products.length &&
                            products.map((product: ProductInterface) => (
                                <Product key={product.id} product={product} reload={() => setReload(product.id)} />
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Home