import React from "react";
import css from './control.module.scss'

export interface IControlProps {
  value: number
  onChange?: (updatedValue: number) => void
}

interface IControlState {
  value: number
  size: number
  stringValue: string
}

export class Control extends React.Component<IControlProps, IControlState> {
  constructor(props: IControlProps) {
    super(props)
    const stringValue = this.getStringValue(props.value)
    this.state = {
      value: props.value ?? 0,
      size: stringValue.length ?? 3,
      stringValue
    }
  }

  componentWillReceiveProps(nextProps: Readonly<IControlProps>): void {
    if (nextProps.value !== this.state.value) {
      const updatedValue = nextProps.value ?? 0
      const updatedStringValue: string = this.getStringValue(updatedValue)
      this.setState({
        value: updatedValue,
        size: updatedStringValue.length ?? 3,
        stringValue: updatedStringValue
      })
    }
  }

  private getStringValue(value: number): string {
    if (Number.isNaN(value)) {
      return '';
    }
    return value.toFixed(value === Math.trunc(value) ? 0 : 2)
  }

  private emitChangeEvent(event: React.FormEvent<HTMLInputElement>): void {
    let inputValue = (event.target as HTMLInputElement).value

    if (inputValue.startsWith('0')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue === '') {
      this.props.onChange(0)
      this.setState({
        value: 0,
        stringValue: '0',
        size: 344
      })
      return
    }

    const isEndingWithFloatingPoint = inputValue.endsWith(',') || inputValue.endsWith('.')
    const hasExtraFloatingPoint = /[,\.][0-9]+[,\.]/.test(inputValue)

    if (hasExtraFloatingPoint) {
      return
    }

    if (isEndingWithFloatingPoint) {
      this.setState({
        stringValue: inputValue.replace(',', '.')
      })
      return
    }

    const updatedState: Partial<IControlState> = {}
    const floatValue = parseFloat(inputValue.replace(',', '.'))
    if (!Number.isNaN(floatValue)) {
      this.props.onChange(floatValue)
      updatedState.value = floatValue;
      updatedState.stringValue = this.getStringValue(floatValue)
    }
    updatedState.size = updatedState.stringValue.length
    this.setState(updatedState as IControlState)
  }

  render() {
    return (
      <label className={css.FormGroup} style={{ width: `${this.state.size}ch` }}>
        <input className={css.FormControl} type="tel" value={this.state.stringValue} onInput={this.emitChangeEvent.bind(this)} />
      </label>
    )
  }
}
