import React from 'react'
import styles from '../../styles/components/PurchaseModal.module.css'
import Image from 'next/image'
import LoadingSpinner from '../general/LoadingSpinner'

type Props = {
	handlePurchaseCoins: () => Promise<void>
	showLoadingSpinner: boolean
	imgSrc: string
	numberOfCoins: string
	purchasePrice: string
}

const BuyCoinModalContents = ({
	handlePurchaseCoins,
	showLoadingSpinner,
	imgSrc,
	numberOfCoins,
	purchasePrice
}: Props) => {
	return (
		<div>
			<div className="mb-2 mt-20 flex flex-col items-center">
				<Image priority={true} src={imgSrc} alt={`The coin you're about to purchase`} width={150} height={120} />
				<h2 className={`${styles.heading1} text-xl font-bold mb-4`}>
					Let's confirm <br /> this purchase
				</h2>
			</div>
			<hr />
			<div className="mt-4 text-center">
				<p>Are you sure you want to buy:</p>
				<div className="text-white mb-3">
					<div className={styles.coinAmount}>
						<h3 className="">{numberOfCoins} Coins?</h3>
					</div>
					<div className={styles.coinPrice}>
						<p>= ${purchasePrice} USD</p>
					</div>
				</div>
				<button className={`${styles.button} btn btn-block normal-case text-black`} onClick={handlePurchaseCoins}>
					{showLoadingSpinner ? (
						<div className="translate-y-[-3px]">
							{/* TODO: Update color */}
							<LoadingSpinner fillColor="fill-black" />
						</div>
					) : (
						'Claim Free Gamer Coin'
					)}
				</button>
			</div>
		</div>
	)
}

export default BuyCoinModalContents
