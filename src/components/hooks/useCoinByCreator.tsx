import * as React from 'react'
import { Coin } from '@/shared/types'

export const useCoinByCreator = (creator: string, isCreatorId: boolean) => {
	const [coin, setCoin] = React.useState<Coin>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)

	const fetchCoinData = async (creator: string) => {
		setError(false)
		try {
			const response = await fetch(`/api/coins/${creator}?isCreatorId=${isCreatorId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await response.json()

			if (result.status === 'ERROR') {
				throw new Error(result.data.error)
			} else {
				const { coin } = result.data
				setCoin(coin)
			}
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (creator) {
			fetchCoinData(creator)
		}
	}, [creator])

	return { coin, isLoading, error }
}
