import * as React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Coin } from '@/shared/types'

export const useCoinsForPurchase = () => {
	const [coinsMap, setCoinsMap] = React.useState<Record<string, number>>()
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
				const coinsWithPriceMap: Record<string, number> = coins.reduce((acc: Record<string, number>, currentCoin: Coin) => {
					const updatedAcc = { ...acc }
					updatedAcc[currentCoin.creatorName] = currentCoin.currentPrice
					return updatedAcc
				}, {})
				setCoinsMap(coinsWithPriceMap)
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

	return { coinsMap, isLoading, error }
}
