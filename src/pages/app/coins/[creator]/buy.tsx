import * as React from 'react'
import { useRouter } from 'next/router'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import Loading from '@/components/general/Loading'
import Layout from '@/components/Layout/secondaryLayout'
import Image from 'next/image'
import { useUserData } from '@/components/hooks/useUserData'
import styles from '../../../../styles/pages/BuyCoin.module.css'
import Modal from '@/components/modal'
import BuyCoinModalContents from '@/components/modal/BuyCoinModalContents'

// TODO: Fix the non-responsiveness on this page
// TODO: Add better error handling here
// TODO: Do better data fetching
// TODO: Extract numpad into it's own component, because it deserves it
const BuyCoinPage = () => {
	const router = useRouter()
	const { creator } = router.query
	const { coin, isLoading: isCoinLoading, error: coinError } = useCoinByCreator(creator as string)
	const { foundUser, isLoading: isUserLoading, error: userError } = useUserData()
	const [numberOfCoins, setNumberOfCoins] = React.useState<string>('')
	const [imgSrc, setImgSrc] = React.useState<string>()
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
	const [error, setError] = React.useState<boolean>(false)
	const [showLoadingButtonSpinner, setShowLoadingButtonSpinner] = React.useState<boolean>(false)
	const isLoading = isCoinLoading || isUserLoading

	React.useEffect(() => {
		if (coinError || userError) {
			setError(true)
			setTimeout(() => {
				setError(false)
			}, 10000)
		}
	}, [coinError, userError])

	React.useEffect(() => {
		if (coin) {
			setImgSrc(`/resources/images/coins/${creator}.png`)
		}
	}, [coin])

	const handleSetNumberOfCoins = (num: string) => {
		switch (num) {
			case '0':
				if (numberOfCoins === '0') {
					return
				}
				setNumberOfCoins((prev) => prev + num)
				break

			case 'X':
				if (numberOfCoins.length <= 1) {
					setNumberOfCoins('0')
				} else {
					setNumberOfCoins((prev) => prev.substring(0, prev.length - 1))
				}
				break

			case '.':
				if (numberOfCoins.includes('.')) {
					return
				}
				setNumberOfCoins((prev) => prev + '.')
				break

			default:
				setNumberOfCoins((prev) => {
					if (prev === '0') {
						return num
					}
					return prev + num
				})
				break
		}
	}

	const handlePurchaseCoins = async (userId: string, creatorName: string, numberOfCoins: string) => {
		setShowLoadingButtonSpinner(true)
		setError(false)
		try {
			const response = await fetch('/api/coins/buy', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId,
					creatorName,
					numberOfCoins
				})
			})

			const result = await response.json()

			if (result.status === 'ERROR') {
				throw new Error(result.data.error)
			} else {
				// Do forward here now that we have a purchase!
			}
		} catch (error) {
			console.error(error)
			setError(true)

			setTimeout(() => {
				setError(false)
			}, 10000)
		} finally {
			setShowLoadingButtonSpinner(false)
		}
	}

	return (
		<main className="container mx-auto px-2 pb-4 max-w-[400px]">
			{coin && (
				<div className="flex flex-col container relative">
					<div className="flex flex-col items-center justify-center mb-4">
						{imgSrc && (
							<Image priority={true} src={imgSrc ? imgSrc : ''} alt={`${creator}'s coin!`} width={120} height={120} />
						)}
						<h1 className="text-3xl font-bold text-white tracking-widest mt-4">{coin.creatorName}</h1>
					</div>
					<Image
						className="mx-auto"
						alt="Horizontal Rule"
						src={require('../../../../resources/images/horizontalline.png')}
					/>
					<div className="flex flex-col text-[#99ffcc] my-3">
						<div className="flex flex-row justify-between px-8">
							<p>Price per Coin:</p>
							<p>${coin.currentPrice} USD</p>
						</div>
						<div className="flex flex-row justify-between px-8 ml-2">
							<p>&gt; Wallet Funds</p>
							<p className="text-yellow-400">${foundUser?.walletFunds.toFixed(2)} USD</p>
						</div>
					</div>
					<Image
						className="mx-auto"
						alt="Horizontal Rule"
						src={require('../../../../resources/images/horizontalline.png')}
					/>
					<div className="py-2">
						<p className="text-white text-center">How many coins do you want to buy?</p>
					</div>
					<Image
						className="mx-auto"
						alt="Horizontal Rule"
						src={require('../../../../resources/images/horizontalline.png')}
					/>
					<div className="text-white mb-3">
						{/* TODO: Make this a fucking component I suck at react */}
						<div className={styles.coinAmount}>
							<h3 className="">{numberOfCoins.length ? numberOfCoins : '0'} Coins</h3>
						</div>
						<div className={styles.coinPrice}>
							<p>= ${(Number(numberOfCoins) * coin.currentPrice).toFixed(2)} USD</p>
						</div>
					</div>
					<Image
						className="mx-auto"
						alt="Horizontal Rule"
						src={require('../../../../resources/images/horizontalline.png')}
					/>
					<div className={styles.numpadContainer}>
						<div className="flex flex-col align-center justify-center">
							<div className={`${styles.numpadRow} w-full`}>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('1')
									}}
								>
									1
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('2')
									}}
								>
									2
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('3')
									}}
								>
									3
								</div>
							</div>
							<div className={`${styles.numpadRow} w-full`}>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('4')
									}}
								>
									4
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('5')
									}}
								>
									5
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('6')
									}}
								>
									6
								</div>
							</div>
							<div className={`${styles.numpadRow} w-full`}>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('7')
									}}
								>
									7
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('8')
									}}
								>
									8
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('9')
									}}
								>
									9
								</div>
							</div>
							<div className={`${styles.numpadRow} w-full`}>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('.')
									}}
								>
									.
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('0')
									}}
								>
									0
								</div>
								<div
									className={`${styles.numPadButton} w-1/3 text-center`}
									onClick={(e) => {
										handleSetNumberOfCoins('X')
									}}
								>
									X
								</div>
							</div>
						</div>
						<button
							disabled={Number(numberOfCoins) == 0}
							onClick={() => setIsModalOpen(true)}
							className={`${styles.button} btn btn-block normal-case text-black`}
						>
							Buy it!
						</button>
					</div>
				</div>
			)}
			{isLoading && <Loading />}
			{error && (
				<div className="toast toast-center z-999">
					<div className="alert alert-error w-[300px]">
						<div>
							<span>
								Error buying token, contact
								<br /> charlie@sparksfullstack.io for help.
							</span>
						</div>
					</div>
				</div>
			)}
			<Modal
				isOpen={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				onClick={() => console.log('also farts')}
				content={
					<BuyCoinModalContents
						handlePurchaseCoins={() =>
							handlePurchaseCoins(
								foundUser!.clerkId,
								creator as string,
								// TODO: Make sure this accounts for fractional coin purchases (if we want that)
								numberOfCoins
							)
						}
						showLoadingSpinner={showLoadingButtonSpinner}
						imgSrc={imgSrc!}
						numberOfCoins={numberOfCoins!}
						purchasePrice={(Number(numberOfCoins) * coin?.currentPrice!).toFixed(2) ?? ''}
					/>
				}
			/>
		</main>
	)
}

export default BuyCoinPage

BuyCoinPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>
