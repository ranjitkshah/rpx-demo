import * as React from 'react'
import styles from '../../../../../../styles/pages/Congrats.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const CongratsPage = () => {
	const router = useRouter()
	const { creator, purchaseAmount, userId } = router.query
	const [imgSrc, setImgSrc] = React.useState<string>()

	const handleChangeView = () => {
		router.push(`/app/user/${userId}/my-stuff`)
	}

	React.useEffect(() => {
		if (creator) {
			setImgSrc(`/resources/images/coins/${creator}.png`)
		}
	}, [creator])

	return (
		<main className={`h-[100vh] w-full ${styles.congratsContainer} `}>
			<div className={`h-[100%]`}>
				<div className="container mx-auto w-[90vw] max-w-[400px] pt-32 flex flex-col items-center">
					<div className="mb-4">
						<Image src={imgSrc ?? ''} alt="Your first coin!" priority={true} width={180} height={120} />
					</div>
					<div>
						<h1 className="text-4xl text-white text-center mx-auto font-bold mb-3">Congrats!</h1>
						<h2 className="text-xl text-white text-center tracking-wider mx-auto mt-1 font-bold">
							You just bought <br /> {purchaseAmount} {creator} Coins
						</h2>
					</div>
				</div>
				{/* TODO: Update other bottom buttons with this strategy*/}
				<div className={`${styles.bottomButtonContainer} flex flex-col`}>
					<button
						onClick={handleChangeView}
						className={`btn normal-case my-2 max-w-[320px] w-[90vw] mx-auto ${styles.secondaryCongratsButton}`}
					>
						Go to My Stuff
					</button>
					<button
						onClick={handleChangeView}
						className={`btn normal-case my-2 max-w-[320px] w-[90vw] mx-auto mt-4 ${styles.congratsButton}`}
					>
						Now, go buy collectible
					</button>
				</div>
			</div>
		</main>
	)
}

export default CongratsPage
