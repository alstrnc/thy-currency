import React, { FormEvent } from "react";

export interface IControlProps {
  id: string;
  value: number;
  currentCurrency: string;
  onChange?: (data: IControlChangeParams) => void;
}

export interface IControlChangeParams {
  id: string;
  updatedValue: number;
  currency: string;
  previousValue: number;
  previousCurrency: string;
}

const currencies = [['🇷🇺 RUB', 'RUB'], ['🇺🇸 USD', 'USD'], ['🇪🇺 EUR', 'EUR']]

export const Control: React.FC<IControlProps> = ({ id, value, currentCurrency, onChange }) => {
  const previousValue = value
  const previousCurrency = currentCurrency
  const handleInput = e => {
    onChange({
      id,
      updatedValue: Number(e.target.value),
      currency: currentCurrency,
      previousValue,
      previousCurrency,
    })
  }

  const handleSelect = e => {
    onChange({
      id,
      updatedValue: value,
      currency: e.target.value,
      previousValue,
      previousCurrency,
    })
  }

  return (
    <div>
      <input type="tel" value={value} onChange={handleInput} />
      <select onChange={handleSelect} value={currentCurrency}>
        {currencies.map(([label, currency], key) => <option key={key} value={currency}>{label}</option>)}
      </select>
    </div>
  )
}
