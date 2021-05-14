export enum Currency {
  RUB,
  USD,
  CAD,
  UAH,
  BYN,
}

export const currencyLabel = {
  [Currency.RUB]: '🇷🇺 Russian Ruble',
  [Currency.BYN]: '🇧🇾 Belarusian Ruble',
  [Currency.USD]: '🇺🇸 US Dollar',
  [Currency.CAD]: '🇨🇦 Canadian Dollar',
  [Currency.UAH]: '🇺🇦 Ukrainian Hryvnia',
} as const;
