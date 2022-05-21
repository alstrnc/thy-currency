import React from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Github } from 'react-bootstrap-icons'
import { Converter } from '../components/converter-form/converter'
import { CurrencySheet } from '../interfaces/currency.interface'
import styles from '../styles/Home.module.scss'

interface IPageProps {
  sheet: any
}

export default class Home extends React.Component<IPageProps> {
  constructor(props: IPageProps) {
    super(props)
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
      </main>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiResponse = await fetch(`${process.env.HOST}/api/currencies`)
  const sheet: CurrencySheet = await apiResponse.json()
  return { props: { sheet } }
}
