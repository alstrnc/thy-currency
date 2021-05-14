import { nanoid } from 'nanoid'
import React from 'react'
import { Control } from './control'
import css from './converter.module.scss'
import { CurrencySelect } from './currency-select/currency-select'
import { Currency, currencyLabel } from './currency.enum'

interface IConverterState {
  sourceValue: number
  resultValue: number
  targetCurrency: Currency
}

export class Converter extends React.Component<{}, IConverterState> {
  constructor(props) {
    super(props)
    this.state = {
      sourceValue: 0,
      resultValue: 0,
      targetCurrency: Currency.RUB,
    }

    this.convert = this.convert.bind(this)
  }

  convert(updatedValue: number): void {
    this.setState({
      sourceValue: updatedValue,
      resultValue: this._getResult(updatedValue)
    })
  }

  private _getResult(sourceValue: number): number {
    return sourceValue
  }

  render() {
    return (
      <form className={css.Form}>
        <div className={css.FormWrap}>
          <label>{currencyLabel[Currency.USD]}</label>
          <Control value={this.state.sourceValue} onChange={this.convert} />
          <CurrencySelect />
        </div>
        <div className={css.FormWrap}>
          <output className={css.FormOutput}>{this.state.resultValue}</output>
        </div>
      </form>
    )
  }
}
