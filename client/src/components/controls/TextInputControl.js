import React from 'react'
import ControlHoc from './ControlHoc'

const TextInputComponent = ({ value, onChange }) => (
    <input className="input" type="text" value={value} onChange={onChange} />
)

export default ControlHoc(TextInputComponent)
