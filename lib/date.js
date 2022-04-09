export const dayList = []
for (let i = 1; i <= 31; i++) {
	dayList.push(i)
}

export const monthList = [
	'styczeń',
	'luty',
	'marzec',
	'kwiecień',
	'maj',
	'czerwiec',
	'lipiec',
	'sierpień',
	'wrzesień',
	'październik',
	'listopad',
	'grudzień',
]

export const yearList = []
for (let i = 2019; i >= 1870; i--) {
	yearList.push(i)
}

export function validateDate(dateString) {
	if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false

	const parts = dateString.split('/')
	const day = parseInt(parts[0], 10)
	const month = parseInt(parts[1], 10)
	const year = parseInt(parts[2], 10)

	if (year < 1000 || year > 3000 || month == 0 || month > 12) return false

	let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29

	return day > 0 && day <= monthLength[month - 1]
}
