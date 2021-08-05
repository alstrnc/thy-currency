import { nanoid } from 'nanoid'
import React from 'react'
import { Control } from './control'
import css from './converter.module.scss'
import { CurrencySelect } from './currency-select/currency-select'
import { Currency, currencyLabel, CurrencySheet } from './currency.interface'

interface IState {
  sourceValue: number
  resultValue: number
  targetCurrency: Currency
}

interface IProps {
  sheet: CurrencySheet;
}

export class Converter extends React.Component<IProps, IState> {
  private _currencyMap: Map<string, number>;

  constructor(props) {
    super(props)
    this.state = {
      sourceValue: 0,
      resultValue: 0,
      targetCurrency: Currency.RUB,
    }
    this._currencyMap = new Map(Object.entries(this.props.sheet))
  }

  convert(updatedValue: number): void {
    this.setState({
      sourceValue: updatedValue,
      resultValue: this._convert(updatedValue, this.state.targetCurrency)
    })
  }

  setCurrency(updatedCurrency: Currency): void {
    const sourceValue = this.state.sourceValue
    this.setState({
      sourceValue,
      targetCurrency: updatedCurrency,
      resultValue: this._convert(sourceValue, updatedCurrency),
    })
  }

  private _convert(sourceValue: number, currency: Currency): number {
    return sourceValue * this._currencyMap.get(currency);
  }

  render() {
    return (
      <form className={css.Form}>
        <div className={css.FormWrap}>
          <label>{currencyLabel[Currency.USD]}</label>
          <Control value={this.state.sourceValue} onChange={e => this.convert(e)} />
          <CurrencySelect excludedCurrencies={[Currency.USD]} value={this.state.targetCurrency} onChange={c => this.setCurrency(c)} />
        </div>
        <div className={css.FormWrap}>
          <output className={css.FormOutput}>{this.state.resultValue.toFixed(2)} {this.state.targetCurrency}</output>
        </div>
      </form>
    )
  }
}
