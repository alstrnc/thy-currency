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
 * @typedef {[number, Currency]} Control
 *
 * @typedef Props
 * @prop {CurrencySheet} sheet
 */

/** @param {Props} props */
export const Converter = (props) => {
	/** @type {Control[]} */
	const defaultCurrencies = [
		[0, 'USD'],
		[0, 'RUB'],
	]
	const currencyMap = /** @type {Map<Currency, number>} */ (new Map(Object.entries(props.sheet)))
	/** @type {[Control[], Function]} */
	const [controls, setControls] = useState(defaultCurrencies)

	/**
	 * @param {number} updatedValue
	 * @param {number} index
	 */
	const convert = (updatedValue, index) => {
		console.log('convert', { updatedValue, index })
		const updatedControls = [...controls]
		updatedControls[index][0] = updatedValue
		setControls(convertAllControls(index, updatedControls))
	}

	/**
	 * @param {number} changedIndex
	 * @param {Control[]} updatedControls
	 */
	const convertAllControls = (changedIndex, updatedControls) => {
		const [refValue, refCurrency] = updatedControls[changedIndex]

		return updatedControls.map(([, currency]) =>
			[_convertValue(refValue, refCurrency, currency), currency]
		)
	}

	/**
	 * @param {Currency} updatedCurrency
	 * @param {number} index
	 */
	const setCurrency = (updatedCurrency, index) => {
		const updatedControls = [...controls]
		updatedControls[index][1] = updatedCurrency
		setControls(convertAllControls(index, updatedControls))
	}

	const addCurrency = () => {
		const updatedControls = [...controls]
		updatedControls.push([0, getUnusedCurrency()])
		setControls(convertAllControls(0, updatedControls))
	}

	/** @returns {Currency} The list of unused currencies */
	const getUnusedCurrency = () => {
		return Array.from(currencyMap.keys()).filter(currency => !controls.some(control => control[1] === currency))[0]
	}

	const reset = () => {
		setControls(defaultCurrencies)
	}

	/**
	 * @param {number} value
	 * @param {Currency} from
	 * @param {Currency} to
	 * @returns {number}
	 */
	const _convertValue = (value, from, to) => {
		const usdValue = value / currencyMap.get(from)
		return usdValue * currencyMap.get(to)
	}

	return (
		<form className="flex flex-col md:flex-row flex-wrap justify-center items-center" onSubmit={e => e.preventDefault()}>
			{controls.map(([value, currency], index) => [
				<div key={index} className="inline-flex w-min items-baseline text-3xl md:text-6xl">
					<Control value={value} onChange={e => convert(e, index)} />
					<CurrencySelect value={currency} onChange={c => setCurrency(c, index)} />
				</div>,
				controls.length !== index + 1 && <ArrowLeftRight key={`icon-${index}`} size={48} className="md:m-5 m-4 size-8 rotate-90 md:rotate-0" />
			])}
			{controls.length < currencyMap.size && <AddButton onClick={() => addCurrency()} />}
			<ResetButton onClick={() => reset()} />
		</form>
	)
}

