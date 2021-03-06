import React from 'react'
import ControlHoc from './ControlHoc'

const DatePickerControl = ({ value, onChange }) => (
    <input className="input" type="date" value={value} onChange={onChange} />
)

export default ControlHoc(DatePickerControl)
