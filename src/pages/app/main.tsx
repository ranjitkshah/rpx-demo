import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
// import electricity from '../../resources/sounds/electricity.mp3'
import dynamic from 'next/dynamic'

const AudioFile = dynamic(() => import('@/components/general/AudioFile'), { ssr: false })

// TODO: update hrefs with more locations
const MainPage = () => {
	return (
		<>
			<AudioFile audioFile="/resources/sounds/Theme.mp3" />
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
				<div className="flex-1 flex flex-col justify-center items-center">
					<Link href="/app/coins">
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
						</div>
					</Link>
				</div>
			</main>
		</>
	)
}

MainPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default MainPage
