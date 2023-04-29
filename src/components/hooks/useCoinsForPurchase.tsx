import * as React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Coin } from '@/shared/types'

export const useCoinsForPurchase = () => {
	const [coins, setCoins] = React.useState<Coin[]>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)

	const fetchCoinData = async () => {
		try {
			const result = await fetch(`/api/coins/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const foundCoins = await result.json()
			setCoins(foundCoins)
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
