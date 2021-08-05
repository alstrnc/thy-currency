export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  EUR = 'EUR',
  CAD = 'CAD',
  JPY = 'JPY'
}

export const currencyLabel = {
  [Currency.RUB]: '🇷🇺 RUB',
  [Currency.USD]: '🇺🇸 USD',
  [Currency.EUR]: '🇪🇺 EUR',
  [Currency.CAD]: '🇨🇦 CAD',
  [Currency.JPY]: '🇯🇵 JPY'
} as const;

export interface ICurrencyAPIResponse {
  query: {
    api: unknown
  }
  data: {
    [date: string]: CurrencySheet
  }
}

export type CurrencySheet = {
  [isoCode in Currency]: number
}
