export enum Currency {
  USD = 'USD',
  JPY = 'JPY',
  BGN = 'BGN',
  CZK = 'CZK',
  DKK = 'DKK',
  GBP = 'GBP',
  HUF = 'HUF',
  PLN = 'PLN',
  RON = 'RON',
  SEK = 'SEK',
  CHF = 'CHF',
  ISK = 'ISK',
  NOK = 'NOK',
  HRK = 'HRK',
  RUB = 'RUB',
  TRY = 'TRY',
  AUD = 'AUD',
  BRL = 'BRL',
  CAD = 'CAD',
  CNY = 'CNY',
  HKD = 'HKD',
  IDR = 'IDR',
  ILS = 'ILS',
  INR = 'INR',
  KRW = 'KRW',
  MXN = 'MXN',
  MYR = 'MYR',
  NZD = 'NZD',
  PHP = 'PHP',
  SGD = 'SGD',
  THB = 'THB',
  ZAR = 'ZAR'
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
    [date: string]: {
      [isoCode in Currency]: number
    }
  }
}
