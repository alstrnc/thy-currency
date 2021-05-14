import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Converter } from '../components/converter'
import { CurrencySheet } from '../components/currency.interface'
import styles from '../styles/Home.module.css'

export default function Home({ sheet }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Thy Currency</title>
        <meta name="description" content="Converts the amount of money from one currency to another" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Currency Converter</h1>

        <div className={styles.Converter}>
          <Converter sheet={sheet} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://mamoruuu.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          <img src="https://github.com/mamoruuu.png?size=48" width={24} height={24} className={styles.footerAvatar} />
          Made by Alexander Bolotskov
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiResponse = await fetch('http://localhost:3000/api/currencies')
  const sheet: CurrencySheet = await apiResponse.json()
  return { props: { sheet } }
}
