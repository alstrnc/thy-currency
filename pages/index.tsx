import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Github } from 'react-bootstrap-icons'
import { Converter } from '../components/converter-form/converter'
import { CurrencySheet } from '../interfaces/currency.interface'
import styles from '../styles/Home.module.css'

export default function Home({ sheet }) {
  return (
    <main className={styles.container}>
      <Head>
        <title>Thy Currency</title>
        <meta name="description" content="Converts the amount of money from one currency to another" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.Header}>
        <a href="https://github.com/mamoruuu/thy-currency" target="_blank" rel="nofollow noopener noreferrer">
          <Github size={32} />
        </a>
      </header>

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
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiResponse = await fetch(`${process.env.HOST}/api/currencies`)
  const sheet: CurrencySheet = await apiResponse.json()
  return { props: { sheet } }
}
