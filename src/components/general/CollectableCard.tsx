import Link from 'next/link'
import * as React from 'react'
import styles from '../../styles/components/CollectableCard.module.css'
import Image from 'next/image'
import LoadingSpinner from './LoadingSpinner'
import dynamic from 'next/dynamic'
const Heart = dynamic(import('react-heart'), { ssr: false })

type Props = {
	linkLocation: string
	collectibleNameSrc: string
	imgSrc: string
	itemPrice: number | undefined
	isPriceLoading: boolean
}

// TODO*: Add heart icon to collectable card
// TODO*: Add other image outlines here
const CollectableCard = ({ linkLocation, collectibleNameSrc, itemPrice, imgSrc, isPriceLoading }: Props) => {
	const [isHeartClicked, setIsHeartClicked] = React.useState<boolean>(false)
	return (
		<div className={`${styles.collectibleLinkBox}`}>
			<div className={`${styles.collectibleContainer}`}>
				<Link href="dicks">
					<div className="flex flex-col items-center mt-8 text-center">
						<Image className="mb-6" alt={'A coin!'} src={imgSrc} width={150} height={149.07} />
						<Image alt="Collectible Name" src={collectibleNameSrc} width={180} height={107} />
					</div>
				</Link>
				<div className="absolute text-center bottom-2">
					<p className={`${styles.collectibleText} translate-y-[-4px] font-light text-[12px]`}>
						Required to buy collectibles
					</p>
					<Image alt="Horizontal Line" src={require('../../resources/images/horizontalline.png')} />
					<div className="w-full mx-auto text-center max-h-[28px] flex justify-center items-center mt-[7px] relative">
						{isPriceLoading ? (
							<LoadingSpinner />
						) : (
							<>
								<h4 className={`${styles.collectibleText} font-bold text-lg`}>
									Price: <span className={styles.priceText}>${itemPrice}</span>
								</h4>
								<div className={`${styles.heartContainer} absolute right-[11px] bg-grey`}>
									<Heart
										isActive={isHeartClicked}
										// inactiveColor="black"
										onClick={() => setIsHeartClicked(!isHeartClicked)}
										className="w-[16px] h-[16px] mt-[1px]"
										style={{ fill: isHeartClicked ? 'red' : 'black' }}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CollectableCard
