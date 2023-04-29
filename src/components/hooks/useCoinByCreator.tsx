import * as React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { Coin } from '@/shared/types'

export const useCoinByCreator = (creator: string) => {
	const [coin, setCoin] = React.useState<Coin>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)

	const fetchCoinData = async (creator: string) => {
		try {
			const result = await fetch(`/api/coins/${creator}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const foundCoin = await result.json()
			setCoin(foundCoin)
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
