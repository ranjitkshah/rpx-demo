import React from 'react'
import styles from '../../styles/components/IntakeModal.module.css'
import Image from 'next/image'
import LoadingSpinner from '../general/LoadingSpinner'
import { UserTypes } from '@/shared/types'

type Props = {
	handleIntakeUser: (intakeType: UserTypes) => Promise<void>
	showLoadingSpinner: boolean
}

const FanIntakeModalContents = ({ handleIntakeUser, showLoadingSpinner }: Props) => {
	return (
		<div>
			<div className="mb-4">
				<h1 className={styles.heading1}>
					Hi Fan, welcome <br /> to Ready Player X!
				</h1>
				<p className="text-center text-md font-medium text-black">
					Own social tokens, exciting moments, and digital apparel from your favourite gamers and esports teams.
				</p>
			</div>
			<hr />
			<div className="mt-4">
				<h2 className={`${styles.heading2} text-xl font-bold mb-4`}>
					Things to know <br /> before getting started:
				</h2>
				<div>
					<p className="text-black">
						1. You always need <b>Gamer Coins</b> to buy <b>Gamer Cards & Collectibles</b> (think of it like tokens to play an
						arcade game)
					</p>
				</div>
				<div className="flex flex-row justify-center mt-4 mb-2">
					<Image
						className="w-[60px] h-[60px]"
						alt="RPX Coin icon"
						src={require('../../resources/images/rpx-browsericon.png')}
					/>

					<Image
						className="w-[16px] h-[26px] mt-[16px] mx-2"
						alt="A triangle icon"
						src={require('../../resources/images/Triangle.png')}
					/>
					<Image
						className="w-[63px] translate-y-[-12px]"
						alt="RPX collectibles icon"
						src={require('../../resources/images/Group 2.png')}
					/>
				</div>
				<p className="text-black">
					2. We’re giving you a <b>free Coin right now</b> because you signed up. With it, you’ll be able to buy any card or
					collectible!
				</p>
				<button
					className={`${styles.button} btn btn-block normal-case text-black`}
					onClick={() => handleIntakeUser(UserTypes.FAN)}
				>
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

export default FanIntakeModalContents
