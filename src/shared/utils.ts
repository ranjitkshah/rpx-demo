export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomPrice(min: number, max: number): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	const randomNumber = Math.random() * (max - min) + min
	return Math.round(randomNumber * 100) / 100
}

export function splitArrayIntoThree(array: any[]) {
	const arrayLength = array.length
	const partLength = Math.ceil(arrayLength / 3)

	const part1 = array.slice(0, partLength)
	const part2 = array.slice(partLength, partLength * 2)
	const part3 = array.slice(partLength * 2)

	return [part1, part2, part3]
}

export const fillArrayToLength = (arr: any[], targetLength: number, defaultValue: any) => {
	const newArray = arr.map((element) => ({ ...element, num: 1 }))

	const object = newArray.reduce((acc, element) => {
		const { id } = element
		if (!acc[id]) {
			acc[id] = element
		} else {
			acc[id].num += 1
		}
		return acc
	}, {})

	console.log('==', { object, arr: Object.values(object) })

	const newArr = Object.values(object)

	while (newArr.length < targetLength) {
		newArr.push(defaultValue)
	}

	return newArr
}
