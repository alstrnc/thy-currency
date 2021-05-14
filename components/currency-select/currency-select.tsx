import React from "react";
import { Currency, currencyLabel } from "../currency.enum";

export const CurrencySelect: React.FC = () => {
  return <div>
    <select>
      {Object.keys(Currency).map((currency, i) => <option key={i} value={currency}>{currencyLabel[currency]}</option>)}
    </select>
  </div>
}
