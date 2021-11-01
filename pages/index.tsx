import Head from 'next/head'
import { Github } from 'react-bootstrap-icons'
import { Converter } from '../components/converter-form/converter'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>Thy Currency</title>
        <meta name="description" content="Converts the amount of money from one currency to another" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.Header}>
        <h1 className={styles.title}>Currency Converter</h1>
        <a href="https://github.com/AlexAtHome/thy-currency" target="_blank" rel="nofollow noopener noreferrer">
          <Github size={32} />
        </a>
      </header>

      <main className={styles.main}>


        <div className={styles.Converter}>
          <Converter />
        </div>
      </main>
    </main>
  )
}
