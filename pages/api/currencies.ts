import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { CurrencyStorage } from '../../utils/currency-storage';

dotenv.config()

const currencyStorage = new CurrencyStorage()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let currencies = currencyStorage.getAll();
  if (!currencies) {
    currencies = await currencyStorage.fetch()
    console.debug('Got currencies from outer API')
  } else {
    console.debug('Got currencies locally')
  }
  return res.status(200).json(currencies)
}
