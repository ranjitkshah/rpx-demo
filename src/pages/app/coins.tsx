import styles from '../../styles/pages/Coins.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CollectableCard from '@/components/general/CollectableCard'
import Layout from '@/components/Layout/mainLayout'
// TODO: Absolutely want to revist just importing all these god damn assets but for now it's fine
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

// TODO: Wire up purchase routes based on which elemeent was clicked
const CoinsPage = () => {
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
						<CollectableCard
							linkLocation={`/app/collectables/Ch40sQueen`}
							collectibleNameSrc={Ch40sQueenText.src}
							imgSrc={Ch40sQueen.src}
							itemPrice={20.0}
						/>
						<CollectableCard
							linkLocation={`/app/collectables/Cr1msonAvenger`}
							collectibleNameSrc={Cr1msonAvengerText.src}
							itemPrice={20.0}
							imgSrc={Cr1msonAvenger.src}
						/>
						<CollectableCard
							linkLocation={`/app/collectables/D3athBlow`}
							collectibleNameSrc={D3athBlowText.src}
							itemPrice={20.0}
							imgSrc={D3athBlow.src}
						/>
						<CollectableCard
							linkLocation={`/app/collectables/DarkNightm4re`}
							collectibleNameSrc={DarkKnightm4reText.src}
							itemPrice={20.0}
							imgSrc={DarkNightm4re.src}
						/>
					</div>
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Latest Drops</h2>
				<div className={styles.horizontalScroll}>
					<CollectableCard
						linkLocation={`/app/collectables/FuryFight3r`}
						collectibleNameSrc={FuryFight3rText.src}
						imgSrc={FuryFight3r.src}
						itemPrice={20.0}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/Infern0Assassin`}
						collectibleNameSrc={Infern0AssassinText.src}
						itemPrice={20.0}
						imgSrc={Infern0Assassin.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/D3athBlow`}
						collectibleNameSrc={D3athBlowText.src}
						itemPrice={20.0}
						imgSrc={D3athBlow.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/NightHunter`}
						collectibleNameSrc={NightHunterText.src}
						itemPrice={20.0}
						imgSrc={NightHunter.src}
					/>
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Esports</h2>
				<div className={styles.horizontalScroll}>
					<CollectableCard
						linkLocation={`/app/collectables/R0gueRider`}
						collectibleNameSrc={R0gueRiderText.src}
						imgSrc={R0gueRider.src}
						itemPrice={20.0}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/StealthSniper`}
						collectibleNameSrc={StealthSniperText.src}
						itemPrice={20.0}
						imgSrc={StealthSniper.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/ThunderB0ltz`}
						collectibleNameSrc={ThunderB0ltzText.src}
						itemPrice={20.0}
						imgSrc={ThunderB0ltz.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/TitanWarrior188`}
						collectibleNameSrc={TitanWarrior188Text.src}
						itemPrice={20.0}
						imgSrc={TitanWarrior188.src}
					/>
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Creators</h2>
				<div className={styles.horizontalScroll}>
					<CollectableCard
						linkLocation={`/app/collectables/Ch40sQueen`}
						collectibleNameSrc={Ch40sQueenText.src}
						imgSrc={Ch40sQueen.src}
						itemPrice={20.0}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/Cr1msonAvenger`}
						collectibleNameSrc={Cr1msonAvengerText.src}
						itemPrice={20.0}
						imgSrc={Cr1msonAvenger.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/D3athBlow`}
						collectibleNameSrc={D3athBlowText.src}
						itemPrice={20.0}
						imgSrc={D3athBlow.src}
					/>
					<CollectableCard
						linkLocation={`/app/collectables/DarkNightm4re`}
						collectibleNameSrc={DarkKnightm4reText.src}
						itemPrice={20.0}
						imgSrc={DarkNightm4re.src}
					/>
				</div>
			</div>

			<Image className="mt-[30px]" alt="horizontal line" src={require('../../resources/images/horizontalline.png')} />
			<ExploreMore />
		</main>
	)
}

CoinsPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default CoinsPage
