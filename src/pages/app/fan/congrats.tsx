import * as React from 'react'
import styles from '../../../styles/pages/Congrats.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const CongratsPage = () => {
	const router = useRouter()

	const handleChangeView = () => {
		router.push('/app/main')
	}

	return (
		<main className={`h-[100vh] w-full ${styles.congratsContainer} `}>
			<div className={`h-[100%]`}>
				<div className="container mx-auto w-[90vw] max-w-[400px] pt-[12vh]">
					<div>
						<Image
							className="mx-auto max-w-[141px] mb-2"
							src={require('../../../resources/images/rpx-browsericon.png')}
							alt="Your first coin!"
							priority={true}
						/>
						<Image
							className="mx-auto max-w-[160px] mb-2 translate-x-[-3px] translate-y-[-156px]"
							src={require('../../../resources/images/coin-border.png')}
							alt="RPX Gamers"
							priority={true}
						/>
					</div>
					<div className="translate-y-[-120px]">
						<h1 className="text-4xl text-white text-center mx-auto font-bold">Congrats!</h1>
						<h2 className="text-lg text-white text-center tracking-wider mx-auto mt-1 font-bold">
							You just earned <br /> your very first coin
						</h2>
					</div>
				</div>
				{/* TODO: Update other bottom buttons with this strategy*/}
				<div className={`${styles.bottomButtonContainer} flex flex-col`}>
					<button
						onClick={handleChangeView}
						className={`btn normal-case my-2 max-w-[320px] w-[90vw] mx-auto ${styles.congratsButton}`}
					>
						Now let's buy something!
					</button>
				</div>
			</div>
		</main>
	)
}

export default CongratsPage
