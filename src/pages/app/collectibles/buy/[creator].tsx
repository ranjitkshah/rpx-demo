import * as React from 'react'
import { useRouter } from 'next/router'
import { Coin } from '@/shared/types'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import Loading from '@/components/general/Loading'
import Layout from '@/components/Layout/secondaryLayout'
import Image from 'next/image'
import { useUserData } from '@/components/hooks/useUserData'
import styles from '../../../../styles/pages/BuyCoin.module.css'

// TODO: Update all loading instances with actual loading component from designs
// TODO: Add better error handling here
// TODO: Do better data fetching
const BuyCoinPage = () => {
	const router = useRouter()
	const { creator } = router.query
	const { coin, isLoading: isCoinLoading, error: coinError } = useCoinByCreator(creator as string)
	const { foundUser, isLoading: isUserLoading, error: userError } = useUserData()
	const isLoading = isCoinLoading || isUserLoading
	const error = coinError || userError
	const [imgSrc, setImgSrc] = React.useState<string>()

	React.useEffect(() => {
		if (coin) {
			setImgSrc('/resources/images/coins/Ch40sQueen.png')
		}
	}, [coin])

	return (
		<main className="container mx-auto">
			{coin && (
				<div className="flex flex-col container">
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
					<div className="text-white flex flex-col">
						<div className="flex flex-row justify-between px-8">
							<p>Price per Coin:</p>
							<p>{coin.currentPrice}</p>
						</div>
						<div className="flex flex-row justify-between px-8">
							<p>&gt; Wallet Funds</p>
							<p>{foundUser?.walletFunds}</p>
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
					<div>Amount</div>
					<Image
						className="mx-auto"
						alt="Horizontal Rule"
						src={require('../../../../resources/images/horizontalline.png')}
					/>
					<div>numpad</div>
					<div>
						<button className={`${styles.button} btn btn-block normal-case text-black`}>Buy it!</button>
					</div>
				</div>
			)}
			{isLoading && <Loading />}
			{error && (
				<div className="toast toast-center z-999">
					<div className="alert alert-error w-[300px]">
						<div>
							<span>
								Error creating account, contact
								<br /> charlie@sparksfullstack.io for help.
							</span>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

export default BuyCoinPage

BuyCoinPage.getLayout = (page: React.ReactChild) => <Layout>{page}</Layout>
