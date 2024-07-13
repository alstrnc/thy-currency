/**
 * The list of supported currencies
 * @readonly
 * @enum {string}
 */
export const currency = /** @type {const} */ ({
	USD: 'USD',
	RUB: 'RUB',
	EUR: 'EUR',
	CAD: 'CAD',
	JPY: 'JPY',
	AMD: 'AMD',
	GEL: 'GEL',
	BYN: 'BYN'
})

Object.freeze(currency)


/** The list of supported currencies */
export const currencies = /** @type {const} */ (['USD', 'RUB', 'EUR', 'CAD', 'JPY', 'AMD', 'GEL', 'BYN'])

/**
 * @typedef {typeof currencies[number]} Currency
 *
 * @typedef {Record<Currency, number>} CurrencySheet 
 */

export const currencyLabel = /** @type {const} */ ({
	[currency.RUB]: '🇷🇺 RUB',
	[currency.USD]: '🇺🇸 USD',
	[currency.EUR]: '🇪🇺 EUR',
	[currency.CAD]: '🇨🇦 CAD',
	[currency.JPY]: '🇯🇵 JPY',
	[currency.AMD]: '🇦🇲 AMD',
	[currency.GEL]: '🇬🇪 GEL',
	[currency.BYN]: '🇧🇾 BYN',
});
Object.freeze(currencyLabel)

