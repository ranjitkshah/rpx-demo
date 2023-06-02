import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
// import electricity from '../../resources/sounds/electricity.mp3'
import dynamic from 'next/dynamic'
import Modal from '@/components/modal'

// TODO: update hrefs with more locations
const MainPage = () => {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				content={
					<div className="flex flex-col text-center justify-between text-black mt-40">
						This feature is still in development, stay tuned!
					</div>
				}
				handleClose={() => setIsModalOpen(false)}
			/>
			<main className={`container mx-auto py-8 flex flex-col space-y-4`}>
				<div className="flex-1 flex flex-col justify-center items-center">
					<Link href="/app/coins">
						<div className="relative">
							<Image
								className="w-[90vw] h-auto object-contain"
								alt="Buy gamer coins"
								src={require('../../resources/images/mainBoxes/Asset 1.png')}
							/>
							<Image
								className="w-[60vw] h-auto object-contain absolute top-[50%] left-[17%]"
								alt="Buy gamer coins"
								src={require('../../resources/images/mainBoxes/Asset 1-TEXT.png')}
							/>
						</div>
					</Link>
				</div>
				<div className="flex-1 flex flex-col justify-center items-center" onClick={() => setIsModalOpen(true)}>
					<div className="relative">
						<Image
							className="w-[90vw] h-auto object-contain"
							alt="Buy gamer coins"
							src={require('../../resources/images/mainBoxes/Asset 2.png')}
						/>
						<Image
							className="w-[75vw] h-auto object-contain absolute top-[46%] left-[8%]"
							alt="Buy gamer coins"
							src={require('../../resources/images/mainBoxes/Asset 2-TEXT.png')}
						/>
						<div
							style={{
								position: 'absolute',
								top: '1px',
								right: '1px',
								backgroundColor: 'white',
								padding: '5px',
								opacity: '0.4',
								borderRadius: '5px'
							}}
						>
							Coming Soon
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

MainPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default MainPage
