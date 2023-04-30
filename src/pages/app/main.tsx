import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
const MainPage = () => {
	return (
		<main className="container mx-auto py-8">
			<div className="flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] max-w-[375px] h-auto"
						alt="Buy gamer coins"
						src={require('../../resources/images/buygamercoins.png')}
					/>
				</Link>
			</div>
			<div className="flex flex-col justify-center items-center my-4">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] max-w-[375px] h-auto"
						alt="Buy gamer coins"
						src={require('../../resources/images/buygamercoins.png')}
					/>
				</Link>
			</div>
			<div className="flex flex-col justify-center items-center">
				<Link href="/app/coins">
					<Image
						className="w-[90vw] max-w-[375px] h-auto"
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
