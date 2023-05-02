import React from 'react'
import Layout from '@/components/Layout/mainLayout'
import styles from '../../../../styles/pages/MyStuff.module.css'
import { useRouter } from 'next/router'
import { RPXUser, Coin } from '@/shared/types'
import Loading from '@/components/general/Loading'

const MyStuffPage = () => {
	const router = useRouter()
	const { id } = router.query
	const [user, setUser] = React.useState<RPXUser | null>()
	const [coins, setCoins] = React.useState<Coin[] | null>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [error, setError] = React.useState<boolean>(false)
	const [showToast, setShowToast] = React.useState<boolean>(false)

	const fetchUserData = async (id: string) => {
		setError(false)
		try {
			const response = await fetch(`/api/coins/get-all/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const result = await response.json()
			if (result.status === 'ERROR') {
				setUser(null)
				setCoins(null)
				setError(true)
			} else {
				const { user, coins } = result.data
				setUser(user)
				setCoins(coins)
			}
		} catch (error) {
			console.error(error)
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	const handleShowToast = () => {
		setShowToast(true)
		setTimeout(() => {
			setShowToast(false)
		}, 10000)
	}

	React.useEffect(() => {
		if (id) {
			fetchUserData(id as string)
		}
	}, [id])

	React.useEffect(() => {
		if (error) {
			handleShowToast()
		}
	}, [error])

	if (isLoading || error) return <Loading />

	return (
		<main className={`container mx-auto py-8 flex flex-col space-y-4`}>
			<div>
				<div>
					<h1 className={styles.sectionTitle}>My Stuff</h1>
				</div>
				<div>
					<p className={styles.body1}>XP status</p>
					<p className={styles.body2}>Level 2</p>
				</div>
				<div>
					<p className={styles.body1}>Current Wallet Funds</p>
					<p className={styles.body2}>Level 2</p>
				</div>
			</div>
			<div className="toast toast-center z-999">
				{!showToast && (
					<div className="alert alert-error w-[300px]">
						<div>
							<span>There was an error fetching your data.</span>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default MyStuffPage

MyStuffPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>
