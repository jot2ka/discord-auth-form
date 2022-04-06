import { Fragment } from 'react'
import '../styles/globals.scss'

import Background from '../components/background/Background'

export default function App({ Component, pageProps }) {
	return (
		<Fragment>
			<Background />
			<Component {...pageProps} />
		</Fragment>
	)
}
