import { ProductInterface } from "../types/Product.Interface.ts"
import { FaTrash, FaEdit } from "react-icons/fa"
import {AxiosError} from "axios"
import {API_URL} from "../utils/mockApi.ts"
import {useDelete} from "../hooks/useDelete.ts"

interface ProductPropsInterface {
    product: ProductInterface,
    reload: () => void
}

const Product = ({ product: { id, name, description, category, price, image }, reload }: ProductPropsInterface) => {
    const {del: deleteProduct} = useDelete(API_URL)
    const handleDelete = async () => {
        try{
            await deleteProduct(id)
            reload()
        } catch(err) {
            throw new Error((err as AxiosError).message)
        }
    }
    return (
        <li className="product-item">
            <h2 className="product-item__title">{name}</h2>
            <p className="product-item__description">{description}</p>
            <p className="product-item__category">{category}</p>
            <p className="product-item__price">{price}</p>
            <img className="product-item__image" src={image} alt={name} />
            <div className="product-item__actions">
                <button className="product-item__delete" onClick={handleDelete}>
                    <FaTrash />
                </button>
                <button className="product-item__edit">
                    <FaEdit />
                </button>
            </div>
        </li>
    )
}

export default Product