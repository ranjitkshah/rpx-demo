import React from 'react'
const styles = {
	heading1: 'text-3xl font-bold mt-6',
	heading2: 'text-lg font-bold mt-6',
	button: 'btn btn-block normal-case my-2'
}

export enum IntakeModalTypes {
	GAMER = 'Gamer',
	FAN = 'Fan'
}

type Props = {
	modalType: IntakeModalTypes
	onClick: () => void
}

const IntakeModalContents = ({ onClick, modalType }: Props) => {
	return (
		<div>
			<h1 className={styles.heading1}>Hi {modalType}, Welcome to Ready Player X!</h1>
			{modalType === IntakeModalTypes.GAMER ? (
				<>
					<p>Own social tokens, exciting moments, and digital apparel from your favourite amer and esports teams</p>
					<hr />
					<h2 className={styles.heading2}>Things to know before getting started</h2>
					<p>
						1. You always need <b>Gamer Coins</b> to buy <b>Gamer Cards & Collectibles</b> (think of it like tokens to play an
						arcade game)
					</p>
					{/* <Image src={'/rpx-browsericon.png'} width={80} height={80} />
			<Image src={'/Triangle.png'} width={29} height={22} />
			<Image src={'/Group 2.png'} width={110} height={118} /> */}
					<p>
						2. We’re giving you a <b>free Coin right now</b> because you signed up. With it, you’ll be able to buy any card or
						collectible!
					</p>
					<div className={styles.button} onClick={onClick}>
						Claim Free Gamer Coin
					</div>
				</>
			) : (
				<div>
					<h1>fan</h1>
				</div>
			)}
		</div>
	)
}

export default IntakeModalContents
