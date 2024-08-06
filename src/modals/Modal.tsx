import {ReactNode} from "react";
import {createPortal} from "react-dom";

interface ModalPropsInterface {
    children: ReactNode
    onClose: () => void
}

const ModalRoot = document.getElementById("modal-root")

const Modal = ({children, onClose}: ModalPropsInterface) => {
    if (!ModalRoot) return null

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal" onClick={handleContentClick}>
                <span className="modal__close" onClick={onClose}>x</span>
                {children}
            </div>
        </div>, ModalRoot
    )
}

export default Modal