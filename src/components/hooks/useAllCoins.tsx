import * as React from 'react'
import { Coin } from '@/shared/types'

export const useAllCoins = () => {
	const [coins, setCoins] = React.useState<Coin[]>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)

	const fetchCoinData = async () => {
		setError(false)
		try {
			const response = await fetch(`/api/coins/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await response.json()

			if (result.status === 'ERROR') {
				throw new Error(result.data.error)
			} else {
				const { coins } = result.data
				setCoins(coins)
			}
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		fetchCoinData()
	}, [])

	return { coins, isLoading, error }
}
