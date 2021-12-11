import { Currency, CurrencySheet, ICurrencyAPIResponse } from "../interfaces/currency.interface";

export class CurrencyStorage {
  private static _dict: CurrencySheet

  get(isoCode: Currency): number {
    return CurrencyStorage._dict?.[isoCode]
  }

  getAll(): CurrencySheet {
    return CurrencyStorage._dict
  }

  async fetch(): Promise<CurrencySheet> {
    if (process.env.DEV_MODE === '1') {
      CurrencyStorage._dict = this._getMockSheet();
      return CurrencyStorage._dict;
    }
    const sheet = await this._getSheetFromApi();
    const [currencies] = Object.values(sheet.data)
    CurrencyStorage._dict = { ...currencies }
    return currencies
  }

  private async _getSheetFromApi(): Promise<ICurrencyAPIResponse> {
    return fetch(`https://freecurrencyapi.net/api/v1/rates?base_currency=USD`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'apikey': process.env.CURRENCY_API_KEY,
        'Content-Type': 'application/json'
      }
    }).then(r => {
      if (r.status === 200) {
        return r.json();
      } else {
        throw new APIError(r);
      }
    })
  }

  private _getMockSheet(): CurrencySheet {
    return {
      CAD: 1.25,
      EUR: 0.85,
      JPY: 110.27,
      RUB: 73.44,
      USD: 1,
    }
  }
}

class APIError extends Error {
  constructor(response: Response) {
    super()
    this.message = `HTTP ${response.status}: ${response.status} at ${response.url}`;
  }
}
