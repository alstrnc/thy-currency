import React, { useState } from "react";
import css from './control.module.scss'

export interface IControlProps {
  value: number
  onChange?: (updatedValue: number) => void
}

export const Control: React.FC<IControlProps> = ({ value = 0, onChange }) => {
  const [size, setSize] = useState(value?.toString().length ?? 3)
  const [stringValue, setStringValue] = useState(value.toString())

  const emitChangeEvent = (event) => {
    let { value: inputValue } = event.target

    if (inputValue.startsWith('0')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue === '') {
      onChange(0)
      setStringValue('0')
      return
    }

    const isEndingWithFloatingPoint = inputValue.endsWith(',') || inputValue.endsWith('.')
    const hasExtraFloatingPoint = /[,\.][0-9]+[,\.]/.test(inputValue)

    if (hasExtraFloatingPoint) {
      return
    }

    if (isEndingWithFloatingPoint) {
      setStringValue(inputValue.replace(',', '.'))
      return
    }

    const floatValue = parseFloat(inputValue.replace(',', '.'))
    if (!Number.isNaN(floatValue)) {
      onChange(floatValue)
      setStringValue(inputValue.replace(',', '.'))
    }
    setSize(floatValue.toString().length)
  }

  return (
    <label className={css.FormGroup} style={{ width: `${size}ch` }}>
      <input className={css.FormControl} type="tel" value={stringValue} onInput={emitChangeEvent} />
    </label>
  )
}
