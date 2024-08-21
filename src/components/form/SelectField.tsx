import { ChangeEvent } from "react"
import {ProductCategoryInterface} from "../../data/mockData.ts";

interface SelectFieldPropsInterface {
    id: string
    value?: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    required?: boolean
    options: ProductCategoryInterface[]
}

const SelectField = ({ id, value, onChange, required = true, options }: SelectFieldPropsInterface) => {
    return (
        <div className="form-group">
            <label className="form-label" htmlFor={id}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </label>
            <select className="form-select" id={id} value={value} onChange={onChange} required={required}>
                <option value="">Please select a {id}</option>
                {options.map((option: ProductCategoryInterface) => (
                    <option value={option.value} key={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField