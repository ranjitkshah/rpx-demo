import * as React from 'react'
import styles from '../../styles/pages/Coins.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CollectableCard from '@/components/general/CollectableCard'
import Layout from '@/components/Layout/mainLayout'

// TODO: Refactor so there's a proper source of truth for coins instead of this, but for now it's fine
// TODO: Absolutely want to revist just importing all these god damn assets but for now it's fine
// TODO*: Figure out how we want to handle the images without the icon around them
// TODO*: Refactor with live data
import Ch40sQueen from '../../resources/images/coins/Ch40sQueen.png'
import Ch40sQueenText from '../../resources/images/coins/Ch40sQueenText.png'
import Cr1msonAvenger from '../../resources/images/coins/Cr1msonAvenger.png'
import Cr1msonAvengerText from '../../resources/images/coins/Cr1msonAvengerText.png'
import D3athBlow from '../../resources/images/coins/D3athBlow.png'
import D3athBlowText from '../../resources/images/coins/D3athBlowText.png'
import DarkNightm4re from '../../resources/images/coins/DarkNightm4re.png'
import DarkKnightm4reText from '../../resources/images/coins/DarkKnightm4reText.png'
import FuryFight3r from '../../resources/images/coins/FuryFight3r.png'
import FuryFight3rText from '../../resources/images/coins/FuryFight3rText.png'
import Infern0Assassin from '../../resources/images/coins/Infern0Assassin.png'
import Infern0AssassinText from '../../resources/images/coins/Infern0AssassinText.png'
import NightHunter from '../../resources/images/coins/NightHunter.png'
import NightHunterText from '../../resources/images/coins/NightHunterText.png'
import R0gueRider from '../../resources/images/coins/R0gueRider.png'
import R0gueRiderText from '../../resources/images/coins/R0gueRiderText.png'
import StealthSniper from '../../resources/images/coins/StealthSniper.png'
import StealthSniperText from '../../resources/images/coins/StealthSniperText.png'
import ThunderB0ltz from '../../resources/images/coins/ThunderB0ltz.png'
import ThunderB0ltzText from '../../resources/images/coins/ThunderB0ltzText.png'
import TitanWarrior188 from '../../resources/images/coins/TitanWarrior188.png'
import TitanWarrior188Text from '../../resources/images/coins/TitanWarrior188Text.png'
import ExploreMore from '@/components/sections/ExploreMore'
import { useAllCoins } from '@/components/hooks/useAllCoins'
import Loading from '@/components/general/Loading'
import { splitArrayIntoThree } from '@/shared/utils'
import { useUser } from '@clerk/nextjs'
import { useUserData } from '@/components/hooks/useUserData'

const coinsImageMap = {
	Cr1msonAvenger,
	D3athBlow,
	DarkNightm4re,
	FuryFight3r,
	Infern0Assassin,
	NightHunter,
	R0gueRider,
	StealthSniper,
	ThunderB0ltz,
	TitanWarrior188
}

const coinsImageNameMap = {
	Cr1msonAvenger: Cr1msonAvengerText,
	D3athBlow: D3athBlowText,
	DarkNightm4re: DarkKnightm4reText,
	FuryFight3r: FuryFight3rText,
	Infern0Assassin: Infern0AssassinText,
	NightHunter: NightHunterText,
	R0gueRider: R0gueRiderText,
	StealthSniper: StealthSniperText,
	ThunderB0ltz: ThunderB0ltzText,
	TitanWarrior188: TitanWarrior188Text
}

// TODO: At some point the coins should have categories and that determines their sort; but for now it's fine
const CoinsPage = () => {
	const { coins, isLoading: areCoinsLoading, error } = useAllCoins()
	const { foundUser, clerkUser: user, isLoading: isUserLoading } = useUserData()
	const [showErrorToast, setShowErrorToast] = React.useState(false)
	const [coinsMap, setCoinsMap] = React.useState<any[][]>()
	const [isLoading, setIsLoading] = React.useState<boolean>(true)

	React.useEffect(() => {
		if (error) {
			setShowErrorToast(true)
			setTimeout(() => {
				setShowErrorToast(false)
			}, 10000)
		}
	}, [error])

	React.useEffect(() => {
		if (coins) {
			// @ts-ignore
			const updatedCoins = []
			coins.forEach((coin) => {
				//@ts-ignore
				// if (coinsImageNameMap[coin.creatorName]) {
				updatedCoins.push(coin)
				// }
			})
			// @ts-ignore
			setCoinsMap(splitArrayIntoThree(updatedCoins))
		}
	}, [coins])

	React.useEffect(() => {
		if (!isUserLoading && !areCoinsLoading) setIsLoading(false)
	}, [isUserLoading, areCoinsLoading])

	if (isLoading || error) return <Loading />

	return (
		<main className="container mx-auto pb-[80px]">
			<div className={styles.title}>
				<div className={styles.absolute}>
					<Link href="/app/main">
						<Image alt="Back button" src={require('../../resources/images/back.png')} width={30} height={30} />
					</Link>
				</div>
				Coins
			</div>

			<div className={styles.content}>
				<div>
					<h2 className={styles.scrollTitle}>Top Trending</h2>
					<div className={`${styles.horizontalScroll}`}>
						{!isLoading &&
							coinsMap?.[0].map((coin) => {
								return (
									<CollectableCard

										isLiked={foundUser?.likedCoins?.includes(coin.id) ?? false}
										userId={user!.id}
										coinId={coin.id}
										isPriceLoading={false}
										linkLocation={`/app/coins/${coin.creatorName}/buy`}
										// @ts-ignore
										// item?.creatorName in coinsImageMap ? coinsImageMap[item.creatorName]?.src : item?.imageUrl
										// collectibleNameSrc={coinsImageNameMap[coin.creatorName]?.src}
										collectibleNameSrc={
											// @ts-ignore
											coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl
										}
										// @ts-ignore
										imgSrc={coin?.creatorName in coinsImageMap ? coinsImageMap[coin.creatorName]?.src : coin?.imageUrl}
										itemPrice={coin?.currentPrice}
									/>
								)
							})}
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Latest Drops</h2>
				<div className={styles.horizontalScroll}>
					{!isLoading &&
						coinsMap?.[1].map((coin) => {
							return (
								<CollectableCard
									isLiked={foundUser?.likedCoins?.includes(coin.id) ?? false}
									userId={user!.id}
									coinId={coin.id}
									isPriceLoading={false}
									linkLocation={`/app/coins/${coin.creatorName}/buy`}
									collectibleNameSrc={
										// @ts-ignore
										coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl
									}
									// @ts-ignore
									imgSrc={coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl}
									itemPrice={coin?.currentPrice}
								/>
							)
						})}
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Esports</h2>
				<div className={styles.horizontalScroll}>
					{!isLoading &&
						coinsMap?.[2].map((coin) => {
							return (
								<CollectableCard
									isLiked={foundUser?.likedCoins?.includes(coin.id) ?? false}
									userId={user!.id}
									coinId={coin.id}
									isPriceLoading={false}
									linkLocation={`/app/coins/${coin.creatorName}/buy`}
									// @ts-ignore
									collectibleNameSrc={
										 // @ts-ignore
										coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl
									}
									// @ts-ignore
									imgSrc={coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl}
									itemPrice={coin?.currentPrice}
								/>
							)
						})}
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Creators</h2>
				<div className={styles.horizontalScroll}>
					{!isLoading &&
						coinsMap?.[0].map((coin) => {
							return (
								<CollectableCard
									isLiked={foundUser?.likedCoins?.includes(coin.id) ?? false}
									userId={user!.id}
									coinId={coin.id}
									isPriceLoading={false}
									linkLocation={`/app/coins/${coin.creatorName}/buy`}
									// @ts-ignore
									collectibleNameSrc={
												 // @ts-ignore

										coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl
									}
									// @ts-ignore
									imgSrc={coin?.creatorName in coinsImageNameMap ? coinsImageNameMap[coin.creatorName]?.src : coin?.imageUrl}
									itemPrice={coin?.currentPrice}
								/>
							)
						})}
				</div>
			</div>

			<Image className="mt-[30px]" alt="horizontal line" src={require('../../resources/images/horizontalline.png')} />
			<ExploreMore />
			{showErrorToast && (
				<div className="toast toast-center z-999">
					<div className="alert alert-error w-[300px]">
						<div>
							<span>
								Error loading tokens, contact
								<br /> charlie@sparksfullstack.io for help.
							</span>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

CoinsPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default CoinsPage
