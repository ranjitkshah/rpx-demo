import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
import useSound from 'use-sound'
// import electricity from '../../resources/sounds/electricity.mp3'

// TODO: update hrefs with more locations
const MainPage = () => {
	// const [audio, setAudio] = React.useState<HTMLAudioElement>()

	// const playAudio = async () => {
	// 	try {
	// 		const result = await audio!.play()
	// 		console.log('result', result)
	// 	} catch (error) {
	// 		console.log('error', error)
	// 	}
	// }
	// React.useEffect(() => {
	// 	setAudio(new Audio('../../resources/sounds/electricity.mp3'))
	// 	// only run once on the first render on the client
	// }, [])

	// React.useEffect(() => {
	// 	setTimeout(() => {
	// 		if (audio) {
	// 			playAudio()
	// 		}
	// 	}, 10000)
	// }, [audio])
	return (
		<main className={`container mx-auto py-8 flex flex-col space-y-4`}>
			<div className="flex-1 flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] h-auto object-contain"
						alt="Buy gamer coins"
						src={require('../../resources/images/buygamercoins.png')}
					/>
				</Link>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] h-auto object-contain"
						alt="Buy gamer coins"
						src={require('../../resources/images/buygamercoins.png')}
					/>
				</Link>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] h-auto object-contain"
						alt="Buy gamer coins"
						src={require('../../resources/images/buygamercoins.png')}
					/>
				</Link>
			</div>
		</main>
	)
}

MainPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default MainPage
