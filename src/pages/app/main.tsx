import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
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
			<div className="flex-1 flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<div className="relative">
						<Image
							className="w-[90vw] h-auto object-contain"
							alt="Buy gamer coins"
							src={require('../../resources/images/mainBoxes/Asset 3.png')}
						/>
						<Image
							className="w-[53vw] h-auto object-contain absolute top-[50%] left-[22%]"
							alt="Buy gamer coins"
							src={require('../../resources/images/mainBoxes/Asset 3-TEXT.png')}
						/>
					</div>
				</Link>
			</div>
		</main>
	)
}

MainPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default MainPage
