import { CurrencySelect } from "components/currency-select/currency-select"
import { Control } from "components/input/control"
import { Currency } from "interfaces/currency.interface"
import React from "react"
import css from './currency-input.module.scss'

interface IProps {
  value: number
  currency: Currency
  excludedCurrencies?: Currency[];
  onValueChange?: (value: number, currency: Currency) => void
  onCurrencyChange?: (previousCurrency: Currency, updatedCurrency: Currency) => void
}

export class CurrencyInput extends React.Component<IProps, { isEditing: boolean }> {
  state = {
    isEditing: false
  }

  private _setCurrency(currency: Currency): void {
    this.props.onCurrencyChange?.(this.props.currency, currency)
  }

  private _setValue(value: number): void {
    this.props.onValueChange?.(value, this.props.currency)
  }

  render() {
    return (
      <div className={css.FormGroup}>
        {!this.state.isEditing && <output onClick={() => this.setState({ isEditing: true })} className={css.FormOutput}>{this.props.value === Math.ceil(this.props.value) ? this.props.value : this.props.value.toFixed(2)}</output>}
        {this.state.isEditing && <Control value={this.props.value} onBlur={() => this.setState({ isEditing: false })} onChange={e => this._setValue(e)} />}
        <CurrencySelect value={this.props.currency} excludedCurrencies={this.props.excludedCurrencies ?? []} onChange={c => this._setCurrency(c)} />
      </div>
    )
  }
}
