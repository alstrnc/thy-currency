import React from "react";

export interface IControlProps {
  value: number;
  onChange?: (updatedValue: number) => void;
}

export const Control: React.FC<IControlProps> = ({ value, onChange }) => {
  const handleInput = (e) => {
    const value = Number(e.target.value)
    if (!Number.isNaN(value)) {
      onChange(value)
    }
  }
  return (
    <div>
      <input type="tel" value={value} onInput={handleInput} />
    </div>
  )
}
