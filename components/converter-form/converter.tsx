import React from 'react'
import css from './converter.module.scss'
import { Currency, CurrencySheet } from 'interfaces/currency.interface'
import { ArrowRight, CurrencyDollar } from 'react-bootstrap-icons'
import { CurrencyInput } from 'components/currency-input/currency-input'

interface IState {
  sourceValue: number
  resultValue: number
  targetCurrency: Currency
  sourceCurrency: Currency
  isLoading: boolean
}

export class Converter extends React.Component<{}, IState> {
  private _currencyMap: Map<string, number>;
  private _sheet: CurrencySheet;

  constructor(props) {
    super(props)
    this.state = {
      sourceValue: 0,
      resultValue: 0,
      sourceCurrency: Currency.USD,
      targetCurrency: Currency.RUB,
      isLoading: true
    }
  }

  async componentDidMount() {
    const apiResponse = await fetch(`/api/currencies`)
    this._sheet = await apiResponse.json()
    this._currencyMap = new Map(Object.entries(this._sheet))
    setTimeout(() => {
      this.stopLoading()
    }, 250)
  }

  convert(updatedValue: number): void {
    this.setState({
      sourceValue: updatedValue,
      resultValue: this._convert(updatedValue, this.state.sourceCurrency, this.state.targetCurrency)
    })
  }

  setCurrency(updatedCurrency: Currency): void {
    const sourceValue = this.state.sourceValue
    this.setState({
      sourceValue,
      targetCurrency: updatedCurrency,
      resultValue: this._convert(sourceValue, this.state.sourceCurrency, updatedCurrency),
    })
  }

  setSourceCurrency(updatedCurrency: Currency): void {
    const sourceValue = this.state.sourceValue
    let targetCurrency = this.state.targetCurrency
    if (targetCurrency === updatedCurrency) {
      targetCurrency = this.state.sourceCurrency
    }
    this.setState({
      sourceValue,
      sourceCurrency: updatedCurrency,
      resultValue: this._convert(sourceValue, updatedCurrency, targetCurrency),
      targetCurrency
    })
  }

  stopLoading(): void {
    this.setState({ isLoading: false });
  }

  private _convert(value: number, from: Currency, to: Currency): number {
    const usdValue = value / this._currencyMap.get(from);
    return usdValue * this._currencyMap.get(to);
  }

  private _renderForm() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className={css.FormWrap}>
          <CurrencyInput
            value={this.state.sourceValue}
            currency={this.state.sourceCurrency}
            onValueChange={(value) => this.convert(value)}
            onCurrencyChange={(_prev, upd) => this.setSourceCurrency(upd)}
          />
          <ArrowRight size={48} className={css.Arrow} />
          <CurrencyInput
            value={this.state.resultValue}
            currency={this.state.targetCurrency}
            excludedCurrencies={[this.state.sourceCurrency]}
            onCurrencyChange={(_prev, upd) => this.setCurrency(upd)}
          />
        </div>
      </form>
    )
  }

  private _renderPreloader() {
    return (<div className={css.Preloader}>
      <span className={css.PreloaderWrap}>
        <CurrencyDollar size={24} />
      </span> Loading the currency sheet...
    </div>)
  }

  render() {
    return this.state.isLoading ? this._renderPreloader() : this._renderForm()
  }
}
