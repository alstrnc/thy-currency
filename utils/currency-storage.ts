import { Currency, CurrencySheet, ICurrencyAPIResponse } from "../components/currency.interface";

export class CurrencyStorage {
  private static _dict: CurrencySheet

  get(isoCode: Currency): number {
    return CurrencyStorage._dict?.[isoCode]
  }

  getAll(): CurrencySheet {
    return CurrencyStorage._dict
  }

  async fetch(): Promise<CurrencySheet> {
    const result = await fetch(`https://freecurrencyapi.net/api/v1/rates?base_currency=USD`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'apikey': process.env.CURRENCY_API_KEY,
        'Content-Type': 'application/json'
      }
    });
    const sheet: ICurrencyAPIResponse = await result.json()
    const [currencies] = Object.values(sheet.data)
    CurrencyStorage._dict = { ...currencies }
    return currencies
  }
}
