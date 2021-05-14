export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  CAD = 'CAD',
}

export const currencyLabel = {
  [Currency.RUB]: '🇷🇺 Russian Ruble',
  [Currency.USD]: '🇺🇸 US Dollar',
  [Currency.CAD]: '🇨🇦 Canadian Dollar',
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
