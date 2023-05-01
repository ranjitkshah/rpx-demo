import * as React from 'react'
import styles from '../../styles/pages/Coins.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CollectableCard from '@/components/general/CollectableCard'
import Layout from '@/components/Layout/mainLayout'

// TODO: Refactor so there's a proper source of truth for coins instead of this, but for now it's fine
// TODO: Absolutely want to revist just importing all these god damn assets but for now it's fine
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
import { useCoinsForPurchase } from '@/components/hooks/useCoinsForPurchase'
import { useAllCoins } from '@/components/hooks/useAllCoins'
import Loading from '@/components/general/Loading'

// TODO: At some point the coins should have categories and that determines their sort; but for now it's fine
const CoinsPage = () => {
	const { coins, isLoading, error } = useAllCoins()
	const [showErrorToast, setShowErrorToast] = React.useState(false)

	React.useEffect(() => {
		if (error) {
			setShowErrorToast(true)
			setTimeout(() => {
				setShowErrorToast(false)
			}, 10000)
		}
	}, [error])

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
						{/* <CollectableCard
							isPriceLoading={isLoading}
							linkLocation={`/app/coins/Ch40sQueen/buy`}
							collectibleNameSrc={Ch40sQueenText.src}
							imgSrc={Ch40sQueen.src}
							itemPrice={coinsMap?.Ch40sQueen}
						/> */}
						{/* <CollectableCard
							isPriceLoading={isLoading}
							linkLocation={`/app/coins/Cr1msonAvenger/buy`}
							collectibleNameSrc={Cr1msonAvengerText.src}
							imgSrc={Cr1msonAvenger.src}
							itemPrice={coinsMap?.Cr1msonAvenger}
						/>
						<CollectableCard
							isPriceLoading={isLoading}
							linkLocation={`/app/coins/D3athBlow/buy`}
							collectibleNameSrc={D3athBlowText.src}
							imgSrc={D3athBlow.src}
							itemPrice={coinsMap?.Cr1msonAvenger}
						/>
						<CollectableCard
							isPriceLoading={isLoading}
							linkLocation={`/app/coins/DarkNightm4re/buy`}
							collectibleNameSrc={DarkKnightm4reText.src}
							imgSrc={DarkNightm4re.src}
							itemPrice={coinsMap?.DarkNightm4re}
						/> */}
					</div>
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Latest Drops</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/FuryFight3r/buy`}
						collectibleNameSrc={FuryFight3rText.src}
						imgSrc={FuryFight3r.src}
						itemPrice={coinsMap?.FuryFight3r}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/Infern0Assassin/buy`}
						collectibleNameSrc={Infern0AssassinText.src}
						imgSrc={Infern0Assassin.src}
						itemPrice={coinsMap?.Infern0Assassin}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/D3athBlow/buy`}
						collectibleNameSrc={D3athBlowText.src}
						imgSrc={D3athBlow.src}
						itemPrice={coinsMap?.D3athBlow}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/NightHunter/buy`}
						collectibleNameSrc={NightHunterText.src}
						imgSrc={NightHunter.src}
						itemPrice={coinsMap?.NightHunter}
					/> */}
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Esports</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/R0gueRider/buy`}
						collectibleNameSrc={R0gueRiderText.src}
						imgSrc={R0gueRider.src}
						itemPrice={coinsMap?.R0gueRider}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/StealthSniper/buy`}
						collectibleNameSrc={StealthSniperText.src}
						imgSrc={StealthSniper.src}
						itemPrice={coinsMap?.StealthSniper}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/ThunderB0ltz/buy`}
						collectibleNameSrc={ThunderB0ltzText.src}
						imgSrc={ThunderB0ltz.src}
						itemPrice={coinsMap?.ThunderB0ltz}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/TitanWarrior188/buy`}
						collectibleNameSrc={TitanWarrior188Text.src}
						imgSrc={TitanWarrior188.src}
						itemPrice={coinsMap?.TitanWarrior188}
					/> */}
				</div>
			</div>
			<div className={styles.content}>
				<h2 className={styles.scrollTitle}>Creators</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/Ch40sQueen/buy`}
						collectibleNameSrc={Ch40sQueenText.src}
						imgSrc={Ch40sQueen.src}
						itemPrice={coinsMap?.Ch40sQueen}
					/> */}
					{/* <CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/Cr1msonAvenger/buy`}
						collectibleNameSrc={Cr1msonAvengerText.src}
						imgSrc={Cr1msonAvenger.src}
						itemPrice={coinsMap?.Cr1msonAvenger}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/D3athBlow/buy`}
						collectibleNameSrc={D3athBlowText.src}
						imgSrc={D3athBlow.src}
						itemPrice={coinsMap?.Cr1msonAvenger}
					/>
					<CollectableCard
						isPriceLoading={isLoading}
						linkLocation={`/app/coins/DarkNightm4re/buy`}
						collectibleNameSrc={DarkKnightm4reText.src}
						imgSrc={DarkNightm4re.src}
						itemPrice={coinsMap?.DarkNightm4re}
					/> */}
				</div>
			</div>

			<Image className="mt-[30px]" alt="horizontal line" src={require('../../resources/images/horizontalline.png')} />
			<ExploreMore />
			{error && (
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
