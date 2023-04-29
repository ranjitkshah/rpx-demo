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
