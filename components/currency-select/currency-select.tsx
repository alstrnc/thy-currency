import React from "react";
import { Currency, currencyLabel } from "../currency.interface";

interface IProps {
  value: Currency;
  onChange: (updatedCurrency: Currency) => void;
}

export const CurrencySelect: React.FC<IProps> = ({ value, onChange }) => {
  const handleChange = e => {
    e.preventDefault()
    onChange(e.target.value)
  }
  return <div>
    <select onChange={handleChange} value={value}>
      {Object.keys(Currency).map((currency, i) => <option key={i} value={currency}>{currencyLabel[currency]}</option>)}
    </select>
    {/* {Object.keys(Currency).map((currency, i) => <label key={i}>
      <input type="radio" checked={currency === value} name="currency" value={currency} onChange={handleChange} />
      {currencyLabel[currency]}
    </label>)} */}
  </div>
}
