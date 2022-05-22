import { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import { CurrencyStorage } from '../../utils/currency-storage'
import differenceInHours from 'date-fns/differenceInHours'

dotenv.config()

const currencyStorage = new CurrencyStorage()

let lastUpdated: Date

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  let currencies = currencyStorage.getAll()
  const canObtainLocally = !!lastUpdated && differenceInHours(new Date(), lastUpdated) < 12
  if (currencies && canObtainLocally) {
    console.debug(`Got currencies locally (from ${lastUpdated.toISOString()})`)
  } else {
    currencies = await currencyStorage.fetch()
    lastUpdated = new Date()
    console.debug('Got currencies from outer API')
  }
  return res.status(200).json({
    currencies,
    lastUpdated: lastUpdated.toISOString(),
  })
}
