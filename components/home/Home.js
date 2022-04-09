import Link from 'next/link'
import classes from './Home.module.scss'

import discord from '../../assets/icons/discord'

import fakeDatabase from '../../lib/fakeDatabase'

export default function Home() {
	const renderDatabase = fakeDatabase.map((item, i) => {
		const { email, name, password } = item
		return (
			<li className={classes.item} key={i}>
				<code className={classes.data}>
					<span className={classes.purple}>{'{'}</span>{' '}
					<span className={classes.white}>email: '</span>
					<span className={classes.green}>{email}</span>
					<span className={classes.white}>', name: '</span>
					<span className={classes.green}>{name}</span>
					<span className={classes.white}>', password: '</span>
					<span className={classes.green}>{password}</span>
					<span className={classes.white}>'</span>{' '}
					<span className={classes.purple}>{'}'}</span>
					<span className={classes.white}>,</span>
				</code>
			</li>
		)
	})

	return (
		<div className={classes.container}>
			<nav className={classes.nav}>
				<div className={classes.logo}>
					<div className={classes.icon}>{discord}</div>
					<div className={classes.name}>Discord</div>
				</div>
				<Link href='/login'>
					<a className={classes.login}>Zaloguj się</a>
				</Link>
			</nav>
			<main className={classes.main}>
				<div className={classes.title}>Discord auth form ...</div>
				<div className={classes.subtitle}>... with some fake database.</div>
				<ul className={classes.list}>
					<li className={classes.item}>
						<code>
							<span className={classes.blue}>const</span>{' '}
							<span className={classes.white}>fakeDatabase</span>{' '}
							<span className={classes.blue}>=</span>{' '}
							<span className={classes.yellow}>[</span>
						</code>
					</li>
					{renderDatabase}
					<li className={classes.item}>
						<code>
							<span className={classes.yellow}>]</span>
						</code>
					</li>
				</ul>
			</main>
		</div>
	)
}
