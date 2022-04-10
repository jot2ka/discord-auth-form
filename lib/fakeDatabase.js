const fakeDatabase = [
	{ email: 'john@hello.com', name: 'johnyy', password: 'potato' },
	{ email: 'phil@hello.com', name: 'phil1', password: 'tomato' },
	{ email: 'andrew@hello.com', name: 'andreee', password: 'banana' },
	{ email: 'jack@hello.com', name: 'thejack', password: 'passw0rd' },
	{ email: 'martin@hello.com', name: 'mart1n', password: 'martin' },
]

export default fakeDatabase

export const isEmailExists = enteredEmail => {
	let check = false
	fakeDatabase.forEach(user => {
		if (enteredEmail === user.email) check = true
	})
	return check
}

export const isNameExists = enteredName => {
	let check = false
	fakeDatabase.forEach(user => {
		if (enteredName === user.name) check = true
	})
	return check
}

export const isPasswordCorrect = (enteredEmail, enteredPassword) => {
	let check = false
	fakeDatabase.forEach(user => {
		if (enteredEmail === user.email && enteredPassword === user.password) {
			check = true
		}
	})
	return check
}
