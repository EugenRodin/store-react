import {ReactNode, useState} from 'react'
import Modal from '../modals/Modal.tsx'
import ProductForm from './form/ProductForm.tsx'
import {useUpdate} from '../hooks/useUpdate.ts'
import {ProductInterface} from '../types/Product.interface.ts'
import {API_URL} from '../utils/mockApi.ts'

interface  EditProductButtonProps {
    children: ReactNode
    product: ProductInterface
    reload: () => void
}

const EditProduct = ({children, product, reload}: EditProductButtonProps) => {
    const [showModal, setShowModal] = useState(false)
    const {update, error} = useUpdate(API_URL)

    const handleOpen = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleSubmit = async (product: Partial<ProductInterface>) => {
        try {
            await update(product as ProductInterface)
            handleClose()
            reload()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <button className="product-item__edit" onClick={handleOpen}>
                {children}
            </button>

            {showModal && (
                <Modal onClose={handleClose}>
                    <h2 className="modal__title">
                        Edit product #{product.id}, {product.title}
                    </h2>
                    {error && <p className="error">{error}</p>}
                    <ProductForm onSubmit={handleSubmit} product={product} />
                </Modal>
            )}
        </>
    )
}

export default EditProduct