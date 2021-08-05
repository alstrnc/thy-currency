import React from "react";
import css from './control.module.scss'

export interface IControlProps {
  value: number
  onChange?: (updatedValue: number) => void
}

export const Control: React.FC<IControlProps> = ({ value, onChange }) => {
  const handleInput = (e) => {
    console.log('handleInput')
    if (e.target.value === '') {
      onChange(0)
      return
    }
    const value = parseInt(e.target.value, 10)
    if (!Number.isNaN(value)) {
      onChange(value)
    }
  }
  return (
    <label className={css.FormGroup}>
      <input className={css.FormControl} type="tel" value={value} onInput={handleInput} size={value.toString().length} />
    </label>
  )
}
