import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { ICurrencyAPIResponse } from '../../components/currency.interface';

dotenv.config()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetch(`https://freecurrencyapi.net/api/v1/rates?base_currency=USD`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'apikey': process.env.CURRENCY_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  const sheet: ICurrencyAPIResponse = await result.json()

  res.status(200).json(Object.values(sheet.data)[0])
}
