import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Github } from 'react-bootstrap-icons'
import format from 'date-fns/format'

import { Converter } from '../components/converter-form/converter'
import { CurrencySheet, SheetDTO } from '../interfaces/currency.interface'
import styles from '../styles/Home.module.scss'

interface IPageProps {
  sheet: CurrencySheet
  lastUpdated: Date
}

interface IPageState {
  lastUpdated: string
}

export default class Home extends React.Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props)
    this.state = {
      lastUpdated: format(new Date(props.lastUpdated), 'PPPppp')
    }
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.error('Failed to register the service worker!', err)
      })
    } else {
      console.warn('Service workers are not supported by this browser!')
    }
  }

  render() {
    return (
      <main className={styles.container}>
        <Head>
          <title>Thy Currency</title>
          <meta name="description" content="Converts the amount of money from one currency to another" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>

        <header className={styles.Header}>
          <h1 className={styles.title}>Thy Currency</h1>
          <a href="https://github.com/AlexAtHome/thy-currency" target="_blank" rel="nofollow noopener noreferrer">
            <Github size={32} />
          </a>
        </header>

        <main className={styles.main}>
          <div className={styles.Converter}>
            <Converter sheet={this.props.sheet} />
          </div>
        </main>

        <footer className={styles.Footer}>
          <p>Last updated: {this.state.lastUpdated}</p>
        </footer>
      </main>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiResponse = await fetch(`${process.env.HOST}/api/currencies`)
  const dto: SheetDTO = await apiResponse.json()
  return {
    props: {
      sheet: dto.currencies,
      lastUpdated: dto.lastUpdated,
    }
  }
}
