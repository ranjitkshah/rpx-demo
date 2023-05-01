import * as React from 'react'
import Layout from '@/components/Layout/mainLayout'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/pages/Main.module.css'

// TODO: update hrefs with more locations
const MainPage = () => {
	return (
		<main className={`${styles.mainContainer} container mx-auto py-4 flex flex-col space-y-4`}>
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
