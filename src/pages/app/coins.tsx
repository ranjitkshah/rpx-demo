import styles from '../../styles/pages/Coins.module.css'
import CoinBanner from '../../components/general/CoinBanner'
import Image from 'next/image'
import Link from 'next/link'
import CollectableCard from '@/components/general/CollectableCard'
import Layout from '@/components/Layout/mainLayout'
// import * from '../../resources/images/ducoin.png`'
import Ch40sQueen from '../../resources/images/coins/Ch40sQueen.png'
import Ch40sQueenText from '../../resources/images/coins/Ch40sQueenText.png'

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
							linkLocation="/collectables/123"
							collectibleNameSrc={Ch40sQueenText.src}
							imgSrc={Ch40sQueen.src}
							itemPrice={20.0}
						/>
						<CollectableCard
							linkLocation="/collectables/123"
							collectibleNameSrc={Ch40sQueenText.src}
							itemPrice={20.0}
							imgSrc={Ch40sQueen.src}
						/>
						{/* <CollectableCard
							imgSrc={ducoinImage.src}
							linkLocation="/collectables/123"
							collectibleNameSrc="Disguised Unicorn"
							
							itemPrice={20.0}
						/>
						<CollectableCard
							imgSrc={ducoinImage.src}
							linkLocation="/collectables/123"
							collectibleNameSrc="Disguised Unicorn"
							
							itemPrice={20.0}
						/> */}
					</div>
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Latest Drops</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/> */}
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Esports</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/> */}
				</div>
			</div>
			<div>
				<h2 className={styles.scrollTitle}>Creators</h2>
				<div className={styles.horizontalScroll}>
					{/* <CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/>
					<CollectableCard
						imgSrc={ducoinImage.src}
						linkLocation="/collectables/123"
						collectibleNameSrc="Disguised Unicorn"
						
						itemPrice={20.0}
					/> */}
				</div>
			</div>

			<Image className="mt-[30px]" alt="horizontal line" src={require('../../resources/images/horizontalline.png')} />
			<div>
				<h2 className={styles.scrollTitle}>Explore More</h2>

				<div className="w-[90%] mx-auto">
					<input
						className="px-2 rounded-lg border-0 h-[24px] text-sm w-[100%] mt-4 mb-2"
						type={'text'}
						placeholder={'Search'}
					/>
				</div>
				<div className={styles.flex}>
					<div className={styles.offwhite}>Top Teams</div>
					<div className={styles.white}>Top Gamers</div>
					<div className={styles.offwhite}>Top New Gamer</div>
					<div className={styles.offwhite}>Top Weekly Gamer</div>
				</div>
				<div className="mt-[-20px]">
					{/* TODO: Wire up these components */}
					<Image alt="Explore more image" src={require('../../resources/images/exploremore.png')} width={380} height={650} />
				</div>
			</div>
		</main>
	)
}

CoinsPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default CoinsPage
