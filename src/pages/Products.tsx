import { ProductInterface } from '../types/Product.interface.ts'
import { API_ITEMS_PER_PAGE_LIMIT, createUrl } from '../utils/mockApi.ts'
import { useEffect, useRef, useState } from 'react'
import Product from '../components/Product.tsx'
import AddProduct from '../components/AddProduct.tsx'
import { debounce } from '../utils/debounce.ts'
import { ORDER_BY_LIST, SORT_BY_LIST } from '../data/mockData.ts'
import { MdRefresh } from 'react-icons/md'
import InputField from '../components/form/InputField.tsx'
import SelectField from '../components/form/SelectField.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { fetchAllProducts, selectProducts, selectProductsError, selectProductsLoading } from '../redux/productsSlice.ts'

const Products = () => {
    const [page, setPage] = useState(1)
    const [name, setName] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const [reload, setReload] = useState('0')

    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector(selectProducts)
    const isLoading = useSelector(selectProductsLoading)
    const error = useSelector(selectProductsError)
    const { isLogged } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchAllProducts(createUrl(page, name, sort, order)))
    }, [dispatch, page, name, sort, order, reload])

    const debouncedSetName = debounce(setName, 1000)

    const resetFilters = () => {
        setName('')
        setSort('')
        setOrder('')
        inputRef.current && (inputRef.current.value = '')
    }

    return (
        <div>
            <h1>Products list page</h1>
            <div className="products-filter">
                <InputField
                    ref={inputRef}
                    id="filter"
                    type="text"
                    placeholder="Filter products by name..."
                    onChange={(e) => debouncedSetName(e.target.value)}
                />
                <SelectField id="sort" value={sort} onChange={(e) => setSort(e.target.value)} options={SORT_BY_LIST} />
                <SelectField id="order" value={order} onChange={(e) => setOrder(e.target.value)} options={ORDER_BY_LIST} />
                <button onClick={resetFilters}>
                    <MdRefresh />
                </button>
            </div>
            {isLoading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && (
                <div className="content">
                    <div className="buttons-group">
                        {isLogged && <AddProduct />}
                        <div className="pagination">
                            <button
                                className="pagination__btn"
                                disabled={page === 1}
                                onClick={() => setPage((prevState) => prevState - 1)}
                            >
                                Previous page
                            </button>
                            <button
                                className="pagination__btn"
                                disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                                onClick={() => setPage((prevState) => prevState + 1)}
                            >
                                Next page
                            </button>
                        </div>
                    </div>

                    <ul className="products-list">
                        {!!products.length &&
                            products.map((product: ProductInterface) => (
                                <Product product={product} reload={() => setReload(product.id + Date.now())} key={product.id} />
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Products