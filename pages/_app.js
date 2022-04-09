import { Fragment } from 'react'
import Head from 'next/head'
import '../styles/globals.scss'

import Background from '../components/background/Background'

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<title>Discord auth form</title>
			</Head>
			<Background />
			<Component {...pageProps} />
		</Fragment>
	)
}
