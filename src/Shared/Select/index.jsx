import React from 'react'

const Select = ({options, ...props}) => {
  return (
    <select {...props}>
      {options && options.map((option, i) => <option value={option.value} key={`select-${i}-${option.value}`}>{option.label}</option>)}
    </select>
  )
}

export default Select