import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import useToggle from '../../hooks/useToggle'
import classes from './Register.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { validateEmail } from '../../lib/auth'
import { dayList, monthList, yearList, validateDate } from '../../lib/date'
import { isEmailExists, isNameExists } from '../../lib/fakeDatabase'

export default function Register() {
	const emailRef = useRef()
	const nameRef = useRef()
	const passwordRef = useRef()

	const [day, setDay] = useState(undefined)
	const [month, setMonth] = useState(undefined)
	const [year, setYear] = useState(undefined)

	const [listsOpen, setListsOpen] = useState({
		days: false,
		months: false,
		years: false,
	})

	const [checkbox, setCheckbox] = useToggle(false)
	const [optional, setOptional] = useToggle(false)

	const [errorEmail, setErrorEmail] = useState(null)
	const [errorName, setErrorName] = useState(null)
	const [errorPassword, setErrorPassword] = useState(null)
	const [errorDate, setErrorDate] = useState(null)

	const [isRegistered, setIsRegistered] = useState(false)

	function handleLists(event) {
		const type = event.target.getAttribute('data-type')
		const newLists = {
			days: false,
			months: false,
			years: false,
		}

		if (type === 'clear') {
			setListsOpen(newLists)
			return
		}

		newLists[type] = true
		setListsOpen(newLists)
	}

	function handleDate(event) {
		const type = event.target.getAttribute('data-type')
		const value = event.target.innerText

		if (type === 'day') setDay(value)
		else if (type === 'month') setMonth(value)
		else if (type === 'year') setYear(value)
	}

	const renderDays = dayList.map((item, i) => {
		return (
			<li key={i} className={classes.item} onClick={handleDate} data-type='day'>
				{item}
			</li>
		)
	})

	const renderMonths = monthList.map((item, i) => {
		return (
			<li
				key={i}
				className={classes.item}
				onClick={handleDate}
				data-type='month'>
				{item}
			</li>
		)
	})

	const renderYears = yearList.map((item, i) => {
		return (
			<li
				key={i}
				className={classes.item}
				onClick={handleDate}
				data-type='year'>
				{item}
			</li>
		)
	})

	// function pretending to be a link that
	// doesn't change value of checkbox
	// by clicking on linked label
	function handleLink(event) {
		event.stopPropagation()
		event.preventDefault()
	}

	function handleSubmit(e) {
		e.preventDefault()

		const enteredEmail = emailRef.current.value
		const enteredName = nameRef.current.value
		const enteredPassword = passwordRef.current.value

		setErrorEmail(null)
		setErrorName(null)
		setErrorPassword(null)
		setErrorDate(null)

		if (!enteredEmail) {
			setErrorEmail('Email is required')
			return
		}

		if (!validateEmail(enteredEmail)) {
			setErrorEmail('Enter valid email')
			return
		}

		if (isEmailExists(enteredEmail)) {
			setErrorEmail('This email already exists')
			return
		}

		if (!enteredName) {
			setErrorName('Name is required')
			return
		}

		if (enteredName.length < 5) {
			setErrorName('Enter at least 5 characters name')
			return
		}

		if (isNameExists(enteredName)) {
			setErrorName('This name already exists')
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

		if (!day || !month || !year) {
			setErrorDate('Date is required')
			return
		}

		const monthNumber = () => {
			let search

			monthList.forEach((item, i) => {
				if (month === item) search = i + 1
			})

			return search
		}

		const enteredDate = `${day}/${monthNumber()}/${year}`

		if (!validateDate(enteredDate)) {
			setErrorDate('Enter valid date')
			return
		}

		setIsRegistered(true)
	}

	return (
		<div className={classes.position}>
			{isRegistered && (
				<div className={classes.isRegistered}>
					<div className={classes.dialog}>
						<div className={classes.message}>
							<div className={classes.title}>
								Poprawnie zarejestrowano użytkownika
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
					<h2 className={classes.title}>Załóż konto</h2>
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
					{errorName ? (
						<label className={classes.labelError}>
							nazwa użytkownika{' '}
							<span className={classes.error}>- {errorName}</span>
						</label>
					) : (
						<label className={classes.label}>nazwa użytkownika</label>
					)}
					<input
						className={classes.input}
						type='text'
						required
						ref={nameRef}
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
					{errorDate ? (
						<label className={classes.labelError}>
							data urodzenia{' '}
							<span className={classes.error}>- {errorDate}</span>
						</label>
					) : (
						<label className={classes.label}>data urodzenia</label>
					)}
					<div className={classes.date}>
						{(listsOpen.days || listsOpen.months || listsOpen.years) && (
							<div
								className={classes.clear}
								onClick={handleLists}
								data-type='clear'
							/>
						)}
						<div
							className={classes.select}
							style={
								day
									? { color: '#b9bbbe', fontWeight: 500 }
									: { color: '#82868b' }
							}
							onClick={handleLists}
							data-type='days'>
							{listsOpen.days && <ul className={classes.list}>{renderDays}</ul>}
							{day ? day : 'Wybierz'}
						</div>
						<div
							className={classes.select}
							style={
								month
									? { color: '#b9bbbe', fontWeight: 500 }
									: { color: '#82868b' }
							}
							onClick={handleLists}
							data-type='months'>
							{listsOpen.months && (
								<ul className={classes.list}>{renderMonths}</ul>
							)}
							{month ? month : 'Wybierz'}
						</div>
						<div
							className={classes.select}
							style={
								year
									? { color: '#b9bbbe', fontWeight: 500 }
									: { color: '#82868b' }
							}
							onClick={handleLists}
							data-type='years'>
							{listsOpen.years && (
								<ul className={classes.list}>{renderYears}</ul>
							)}
							{year ? year : 'Wybierz'}
						</div>
					</div>
					<div className={classes.checkboxes}>
						<div className={classes.checkbox} onClick={() => setCheckbox()}>
							<div className={classes.check}>
								{checkbox && (
									<div className={classes.checkboxIcon}>
										<FontAwesomeIcon icon={faCheck} />
									</div>
								)}
							</div>
							<div className={classes.description}>
								Przeczytałem(-łam) i akceptuję{' '}
								<span className={classes.link} onClick={handleLink}>
									Warunki korzystania z Usługi
								</span>{' '}
								oraz{' '}
								<span className={classes.link} onClick={handleLink}>
									Politykę Prywatności
								</span>{' '}
								Discorda
							</div>
						</div>
						<div className={classes.optional} onClick={() => setOptional()}>
							<div className={classes.check}>
								{optional && (
									<div className={classes.checkboxIcon}>
										<FontAwesomeIcon icon={faCheck} />
									</div>
								)}
							</div>
							<div className={classes.description}>
								(Opcjonalne) Discord może wysyłać mi wiadomość e-mail z
								aktualizacjami, wskazówkami i specjalnymi ofertami. Możesz
								zrezygnować w dowolnej chwili.
							</div>
						</div>
					</div>
					{checkbox ? (
						<button className={classes.submit} type='submit'>
							Kontynuuj
						</button>
					) : (
						<button className={classes.isChecked} disabled>
							Kontynuuj
						</button>
					)}
					<div className={classes.footer}>
						<p className={classes.account}>
							<Link href='/login'>
								<a className={classes.link}>Masz już konto?</a>
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
