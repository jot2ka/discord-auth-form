import { useState, useRef } from 'react'
import Link from 'next/link'
import classes from './Login.module.scss'

import { validateEmail } from '../../lib/auth'
import { isPasswordCorrect, isEmailExists } from '../../lib/fakeDatabase'

export default function Login() {
	const emailRef = useRef()
	const passwordRef = useRef()

	const [errorEmail, setErrorEmail] = useState(null)
	const [errorPassword, setErrorPassword] = useState(null)

	const [isLogged, setIsLogged] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()

		const enteredEmail = emailRef.current.value
		const enteredPassword = passwordRef.current.value

		setErrorEmail(null)
		setErrorPassword(null)

		if (!enteredEmail) {
			setErrorEmail('Email is required')
			return
		}

		if (!validateEmail(enteredEmail)) {
			setErrorEmail('Enter valid email')
			return
		}

		if (!isEmailExists(enteredEmail)) {
			setErrorEmail('Wrong email or password')
			return
		}

		if (!enteredPassword) {
			setErrorPassword('Password is required')
			return
		}

		if (enteredPassword.length < 6) {
			setErrorPassword('Enter at least 6 characters password')
			return
		}

		if (!isPasswordCorrect(enteredEmail, enteredPassword)) {
			setErrorPassword('Wrong email or password')
			return
		}

		setIsLogged(true)
	}

	return (
		<div className={classes.position}>
			{isLogged && (
				<div className={classes.isLogged}>
					<div className={classes.dialog}>
						<div className={classes.message}>
							<div className={classes.title}>
								Poprawnie zalogowano użytkownika
							</div>
							<Link href='/'>
								<a className={classes.link}>Strona główna</a>
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className={classes.container}>
				<div className={classes.header}>
					<h2 className={classes.title}>Witamy ponownie!</h2>
					<p className={classes.subtitle}>
						Cieszymy się, że znowu z nami jesteś!
					</p>
				</div>
				<form className={classes.form} onSubmit={handleSubmit} noValidate>
					{errorEmail ? (
						<label className={classes.labelError}>
							adres email <span className={classes.error}>- {errorEmail}</span>
						</label>
					) : (
						<label className={classes.label}>adres email</label>
					)}
					<input
						className={classes.input}
						type='email'
						required
						ref={emailRef}
						autoComplete='off'
					/>
					{errorPassword ? (
						<label className={classes.labelError}>
							hasło <span className={classes.error}>- {errorPassword}</span>
						</label>
					) : (
						<label className={classes.label}>hasło</label>
					)}
					<input
						className={classes.input}
						type='password'
						required
						ref={passwordRef}
					/>
					<p className={classes.forget}>Nie pamiętasz hasła?</p>
					<button className={classes.submit} type='submit'>
						Zaloguj się
					</button>
					<div className={classes.footer}>
						<p className={classes.account}>
							Potrzebujesz konta?{' '}
							<Link href='/register'>
								<a className={classes.link}>Zarejestruj się</a>
							</Link>
						</p>
						<Link href='/'>
							<a className={classes.link}>Strona główna</a>
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
