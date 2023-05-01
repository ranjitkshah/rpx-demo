import * as React from 'react'
import { RPXUser } from '@/shared/types'
import { useUser } from '@clerk/nextjs'

// TODO: Figure out why this is initiating two calls
export const useUserData = () => {
	const [foundUser, setFoundUser] = React.useState<RPXUser | null>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)
	const { user: clerkUser } = useUser()

	const fetchUserData = async (id: string) => {
		setError(false)
		try {
			const response = await fetch(`/api/users/clerk/${clerkUser!.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await response.json()
			if (result.status === 'ERROR') {
				setFoundUser(null)
			} else {
				const { user } = result.data
				setFoundUser(user)
			}
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (clerkUser) {
			fetchUserData(clerkUser.id)
		}
	}, [clerkUser])

	return { foundUser, clerkUser, isLoading, error }
}
