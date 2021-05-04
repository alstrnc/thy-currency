import { nanoid } from 'nanoid'
import React from 'react'
import { Control, IControlChangeParams } from './control'
import css from './converter.module.scss'

interface IConverterState {
  entries: IConverterEntry[]
}

interface IConverterEntry {
  id: string
  value: number
  currency: string
}

export class Converter extends React.Component<{}, IConverterState> {
  constructor(props) {
    super(props)
    this.state = {
      entries: [
        {
          id: this._setId(),
          value: 100,
          currency: 'RUB'
        },
        {
          id: this._setId(),
          value: 7500,
          currency: 'USD'
        }
      ]
    }

    this.convert = this.convert.bind(this)
  }

  convert({ id, updatedValue, currency }: IControlChangeParams): void {
    this.setState(({ entries: prevEntries }) => {
      const entries = prevEntries.map(entry => entry.id === id ? { ...entry, currency, value: updatedValue } : { ...entry })
      return { entries }
    })
  }

  render() {
    return (
      <form className={css.Form}>
        <div className={css.FormWrap}>
          {this.state.entries.map(entry =>
            <Control value={entry.value} id={entry.id} key={entry.id} currentCurrency={entry.currency} onChange={this.convert} />
          )}
        </div>
      </form>
    )
  }

  private _setId(): string {
    return nanoid(20);
  }
}
