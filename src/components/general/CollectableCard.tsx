import Link from 'next/link'
import React from 'react'
import styles from '../../styles/components/CollectableCard.module.css'
import Image from 'next/image'

type Props = {
	linkLocation: string
	collectibleName: string
	hasBackground?: boolean
	itemPrice: number
}

const CollectableCard = ({ linkLocation, collectibleName, hasBackground, itemPrice }: Props) => {
	// TODO: Replace once we have a real price from the DB
	const price = itemPrice.toFixed(2)

	return (
		<Link href={linkLocation}>
			<div className={`${styles.collectibleContainer} ${hasBackground && styles.collectibleContainerWithBackground}`}>
				<div className="flex flex-col items-center mt-12 text-center">
					<Image className="mb-6" alt={'A coin!'} src={require('../../resources/images/ducoin.png')} width={170} />
					{/* TODO: Figure out how to twist the name if we have time */}
					<h3 className={`${styles.collectibleText} text-[26px] font-bold mb-16`}>{collectibleName}</h3>
					<p className={`${styles.collectibleText} translate-y-[-8px] font-light text-[12px]`}>
						Required to buy collectibles
					</p>
				</div>
				<Image alt="Horizontal Line" src={require('../../resources/images/horizontalline.png')} />
				<div className="w-full mx-auto text-center flex justify-center items-center mt-[7px]">
					<h4 className={`${styles.collectibleText} font-bold text-lg`}>
						Price: <span className={styles.priceText}>${price}</span>
					</h4>
				</div>
			</div>
		</Link>
	)
}

export default CollectableCard
