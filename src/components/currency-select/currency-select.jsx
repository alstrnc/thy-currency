import { currencies, currency, currencyLabel } from "../../models/currency";

/**
 * @typedef {import('../../models/currency').Currency} Currency
 *
 * @typedef Props
 * @prop {currency[number]} value
 * @prop {(updatedCurrency: Currency) => void} [onChange]
 * @prop {Currency[]} [excludedCurrencies]
 */

/** @param {Props} props */
export const CurrencySelect = ({ value, onChange, excludedCurrencies = [] }) => {
	/** @type {React.ChangeEventHandler<HTMLSelectElement>} */
	const handleChange = e => {
		e.preventDefault()
		onChange(/** @type {Currency} */(e.target.value))
	}

	const currenciesToChoose = currencies.filter(currency => !excludedCurrencies.includes(currency))

	return <div>
		<select className="appearance-none inherit-bg border-0 font-light" onChange={handleChange} value={value}>
			{currenciesToChoose.map((currency, i) =>
				<option className="text-3xl font-light text-inherit" key={i} value={currency}>
					{currencyLabel[currency] ?? currency.toUpperCase()}
				</option>)
			}
		</select>
	</div>
}
