import { ChangeEvent } from 'react'
import { ProductCategoriesInterface } from '../../data/mockData.ts'

interface SelectFieldPropsInterface {
    id: string
    value: string
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    options: ProductCategoriesInterface[]
    required?: boolean
}

const SelectField = ({ id, value, onChange, options, required = true }: SelectFieldPropsInterface) => {
    console.log(id)
    console.log(value)

    return (
        <div className="form-group">
            <label className="form-label" htmlFor="category">
                {id.charAt(0).toUpperCase() + id.slice(1)}:
            </label>
            <select className="form-control" id={id} value={value} onChange={onChange} required={required}>
                <option value="">Please select a {id}...</option>
                {options.map((option: ProductCategoriesInterface) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField