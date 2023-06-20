import * as React from 'react'
import styles from '../../../../../../styles/pages/Congrats.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCoinByCreator } from '@/components/hooks/useCoinByCreator'
import { useUserData } from '@/components/hooks/useUserData'
import Modal from '@/components/modal'
import { coinsImageMap } from '@/shared/constants'

const CongratsPage = () => {
	const router = useRouter()
	const { creator, purchaseAmount, clerkId } = router.query
	const { foundUser, isLoading: isUserLoading, error: userError } = useUserData()
	const [isCollectibleModalOpen, setIsCollectibleModalOpen] = React.useState<boolean>(false)
	const handleChangeView = () => {
		router.push(`/app/user/${foundUser?.id}/my-stuff`)
	}

	const { coin, isLoading: isCoinLoading, error: coinError } = useCoinByCreator(creator as string, false)

	return (
		<>
			<Modal
				isOpen={isCollectibleModalOpen}
				content={
					<div className="flex flex-col text-center justify-between text-black mt-40">
						This feature is still in development, stay tuned!
					</div>
				}
				handleClose={() => setIsCollectibleModalOpen(false)}
			/>
			<main className={`h-[100vh] w-full ${styles.congratsContainer} `}>
				<div className={`h-[100%]`}>
					<div className="container mx-auto w-[90vw] max-w-[400px] pt-32 flex flex-col items-center">
						<div className="mb-4">
							<Image
								src={
									coin?.creatorName && coin.creatorName in coinsImageMap
										? coinsImageMap[coin.creatorName]?.src
										: coin?.imageUrl || ''
								}
								alt="Your first coin!"
								priority={true}
								width={180}
								height={120}
							/>
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
							onClick={() => setIsCollectibleModalOpen(true)}
							// onClick={handleChangeView}
							className={`btn normal-case my-2 max-w-[320px] w-[90vw] mx-auto mt-4 ${styles.congratsButton}`}
						>
							Now, go buy collectible
						</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default CongratsPage
