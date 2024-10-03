import { ArrowLeftRight } from "react-bootstrap-icons"
import { Control } from "../control/control"
import { CurrencySelect } from "../currency-select/currency-select"
import { AddButton } from "../add-button/add-button"
import { ResetButton } from "../reset-button/reset-button"
import { useState } from "react"

/**
 * @typedef {import("../../models/currency").CurrencySheet} CurrencySheet
 * @typedef {import("../../models/currency").Currency} Currency
 *
 * @typedef {Partial<Record<Currency, number>>} Control
 *
 * @typedef Props
 * @prop {CurrencySheet} sheet
 */

/** @param {Props} props */
export const Converter = (props) => {
	const [usd, setUsd] = useState(0);
	const [rub, setRub] = useState(0);

	const reset = () => {
		setUsd(0)
		setRub(0)
	}

	/**
	 * @param {number} amount
	 * @param {Currency} from
	 * @param {Currency} to
	 * @returns {void}
	 */
	function convert(amount, from, to) {
		if (from === 'USD') {
			setUsd(amount)
			setRub(amount * props.sheet[to])
		} else if (from === 'RUB') {
			setRub(amount)
			setUsd(amount * props.sheet[to])
		}
	}

	return (
		<form className="flex flex-col md:flex-row flex-wrap justify-center items-center" onSubmit={e => e.preventDefault()}>
			<div className="inline-flex w-min items-baseline text-3xl md:text-6xl">
				<Control value={usd} onChange={update => convert(update, 'USD', 'RUB')} />
				<CurrencySelect value="USD" />
			</div>
			<ArrowLeftRight size={48} className="md:m-5 m-4 size-8 rotate-90 md:rotate-0" />
			<div className="inline-flex w-min items-baseline text-3xl md:text-6xl">
				<Control value={rub} onChange={update => convert(update, 'RUB', 'USD')} />
				<CurrencySelect value="RUB" />
			</div>
			<AddButton />
			<ResetButton onClick={() => reset()} />
		</form>
	)
}

