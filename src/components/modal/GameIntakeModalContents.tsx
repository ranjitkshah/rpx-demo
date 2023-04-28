import React from 'react'
import styles from '../../styles/components/IntakeModal.module.css'
import Image from 'next/image'
import type { UserResource } from '@clerk/types'
import LoadingSpinner from '../general/LoadingSpinner'

type Props = {
	user: UserResource
}

const GamerIntakeModalContents = ({ user }: Props) => {
	return (
		<div>
			<div className="mb-4">
				<h1 className={styles.heading1}>
					Hi Gamer, welcome <br /> to Ready Player X!
				</h1>
				<p className="text-center text-md font-medium">
					You'll be able to quickly create your own gamer coins and digital collectibles.
				</p>
			</div>
			<hr />
			<div className="mt-4">
				<h2 className={`${styles.heading2} text-xl font-bold mb-4`}>
					Things to know <br /> before getting started:
				</h2>
				<div className="text-center leading-snug">
					<p>
						You need to create a <b>Gamer coin</b> first before making your <b>Collectibles</b>
					</p>
					<span className={styles.reasonText}>Reason being:</span>
					<p>1 coin = 1 collectible</p>
					<p>(i.e.: if they want to purchase 3 collectibles, then tehy will need to purchase 3 coins first, makes sense?)</p>
				</div>
				<div className="flex flex-row justify-center mt-8">
					<Image
						className="w-[70px] h-[70px]"
						alt="RPX Coin icon"
						src={require('../../resources/images/rpx-browsericon.png')}
					/>

					<Image
						className="w-[16px] h-[26px] mt-[22px] mx-2"
						alt="A triangle icon"
						src={require('../../resources/images/Triangle.png')}
					/>
					<Image
						className="w-[80px] translate-y-[-18px]"
						alt="RPX Collectables icon"
						src={require('../../resources/images/Group 2.png')}
					/>
				</div>
				{/* TODO: On these buttons update the user records w/ their role */}
				<button className={`${styles.button} btn btn-block normal-case text-black`} onClick={() => console.log('farts')}>
					{user ? (
						'Create your first coin!'
					) : (
						<div className="translate-y-[-3px]">
							{/* TODO: Update color */}
							<LoadingSpinner fillColor="fill-black" />
						</div>
					)}
				</button>
			</div>
		</div>
	)
}

export default GamerIntakeModalContents
