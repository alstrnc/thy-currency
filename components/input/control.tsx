import React, { useState } from "react";
import css from './control.module.scss'

export interface IControlProps {
  value: number
  onChange?: (updatedValue: number) => void
}

export const Control: React.FC<IControlProps> = ({ value, onChange }) => {
  const [size, setSize] = useState(value.toString().length)

  const emitChangeEvent = (e) => {
    setSize(e.target.value.length)
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
    <label className={css.FormGroup} style={{ width: `${size}ch` }}>
      <input className={css.FormControl} type="tel" value={value} onInput={emitChangeEvent} />
    </label>
  )
}
