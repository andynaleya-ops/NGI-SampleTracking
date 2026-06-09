export const censorName = (name: string): string => {
	if (!name) return ''

	return name
		.split(' ')
		.map((word) => maskWord(word))
		.join(' ')
}

const maskWord = (word: string): string => {
	if (word.length <= 2) {
		return word[0] + '*'.repeat(word.length - 1)
	}

	const first = word[0]
	const last = word[word.length - 1]
	const middle = '*'.repeat(word.length - 2)

	return first + middle + last
}
