export enum Currency {
  USD = 'USD',
  RUB = 'RUB',
  EUR = 'EUR',
  CAD = 'CAD',
  JPY = 'JPY',
  AMD = 'AMD',
  GEL = 'GEL',
  BYN = 'BYN'
}

export const currencyLabel = {
  [Currency.RUB]: '🇷🇺 RUB',
  [Currency.USD]: '🇺🇸 USD',
  [Currency.EUR]: '🇪🇺 EUR',
  [Currency.CAD]: '🇨🇦 CAD',
  [Currency.JPY]: '🇯🇵 JPY',
  [Currency.AMD]: '🇦🇲 AMD',
  [Currency.GEL]: '🇬🇪 GEL',
  [Currency.BYN]: '🇧🇾 BYN',
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

export interface SheetDTO {
  currencies: CurrencySheet;
  lastUpdated: string;
}
