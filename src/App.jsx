import { Github } from 'react-bootstrap-icons'
import { Converter } from './components/converter-form/converter'

export default function App() {
	/** @type {import('./models/currency').CurrencySheet} */
	const sheet = {
		CAD: 1.25,
		EUR: 0.85,
		JPY: 110.27,
		RUB: 73.44,
		USD: 1,
		GEL: 3.210,
		AMD: 490.10864,
		BYN: 3.26698
	}

	return (
		<div className="min-h-screen py-0 px-2 flex flex-col justify-center items-center">
			<header className="w-full p-4 flex justify-between">
				<h1 className="m-0 leading-none font-light text-4xl md:text-3xl">Thy Currency</h1>
				<a href="https://github.com/AlexAtHome/thy-currency" target="_blank" rel="nofollow noreferrer">
					<Github size={32} />
				</a>
			</header>

			<main className="p-0 md:py-20 md:mb-24 flex flex-col flex-grow flex-shrink justify-center items-center">
				<div className="mt-10">
					<Converter sheet={sheet} />
				</div>
			</main>

			<footer className="flex items-center justify-center opacity-50 h-16">
				<p>Last updated: TODO</p>
			</footer>
		</div>
	)
}
