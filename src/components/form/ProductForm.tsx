import { ProductInterface } from "../../types/Product.interface.ts"
import { FormEvent, useState } from "react"
import { PRODUCT_CATEGORIES } from "../../data/mockData.ts"
import InputField from "./InputField.tsx"
import SelectField from "./SelectField.tsx";


interface ProductFormPropsInterface {
    onSubmit: (product: Partial<ProductInterface>) => void
    product: Partial<ProductInterface>
}

const ProductForm = ({ onSubmit, product }: ProductFormPropsInterface) => {
    const [name, setName] = useState(product.name as string)
    const [price, setPrice] = useState(product.price as number)
    const [description, setDescription] = useState(product.description as string)
    const [category, setCategory] = useState(product.category as string)
    const [image, setImage] = useState(product.image as string)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const returnedProduct: Partial<ProductInterface> = {
            name,
            price,
            description,
            category,
            image,
        }
        if (product.id) {
            returnedProduct.id = product.id
        }
        onSubmit(returnedProduct)
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                required
            />
            <InputField
                id="description"
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description..."
                required
            />
            <InputField
                id="price"
                type="number"
                value={`${price}`}
                onChange={(e) => setPrice(+e.target.value)}
                placeholder="Product price"
                required
            />
            <InputField
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL..."
                required
            />
            <SelectField
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                options={PRODUCT_CATEGORIES}
            />
            <div className="form-group">
                <button className="form-button" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default ProductForm