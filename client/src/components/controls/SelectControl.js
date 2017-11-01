import React from 'react'
import ControlHoc from './ControlHoc'

const SelectControl = ({ value, field, onChange }) => (
    <select value={value} onChange={onChange}>
        {field.options.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
    </select>
)

export default ControlHoc(SelectControl)
