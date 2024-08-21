import { ChangeEvent, forwardRef } from "react"
import {ProductCategoryInterface} from "../../data/mockData.ts";

interface InputFieldPropsInterface {
    label: string
    id: string
    type?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    placeholder: string
    required?: boolean
    textarea?: boolean
    options?: ProductCategoryInterface[]
}

const InputField = forwardRef<HTMLInputElement, InputFieldPropsInterface>(({id, type = "text", value, onChange, placeholder, required = true, textarea = false},
                    ref) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
            {textarea ? (
                <textarea
                    className="form-control"
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            ) : (
                <input
                    className="form-control"
                    ref={ref}
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    )
} )

export default InputField