import React from 'react'
import ControlHoc from './ControlHoc'

const SelectControl = ({ value, field, onChange }) => (
    <div className="select">
        <select value={value} onChange={onChange}>
            {field.options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
)

export default ControlHoc(SelectControl)
