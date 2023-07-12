import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import styles from '../../../styles/layout/mainLayout/HeaderAndFooter.module.css'
import { useClerk } from '@clerk/nextjs'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// const AudioFile = dynamic(() => import('../../general/AudioFile'), { ssr: false })

// TODO: add filter and plus icons if we have time
// TODO: Wire up other icons (maybe to a coming soon page) if we have extra time
const Header = () => {
	const router = useRouter()
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (buttonRef.current) {
				buttonRef.current.click()
			}
		}, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [])

	const handleClick = () => {
		// Perform button click logic here
		console.log('Button clicked!')
	}

	return (
		<header className={styles.header}>
			<Head>
				<script
					src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"
					integrity="sha512-..."
					crossOrigin="anonymous"
				/>
			</Head>
			{/* <AudioFile audioFile="/resources/sounds/Theme.mp3" /> */}
			<nav ref={buttonRef} onClick={handleClick}>
				{/* TODO: Reinstate this hella padding if Varun wants it, also have to redo calcs around main height if so */}
				{/* <div className={`pt-14 flex justify-center w-[100vw] mb-4`}> */}
				<div className={`py-4 flex justify-center w-[100vw]`}>
					<div className="flex flex-row items-center w-full justify-around">
						<div
							className="ml-2"
							onClick={() => {
								router.push('/app/main')
							}}
						>
							<Image alt="RPX Logo" src={require('../../../resources/images/rpxlogo.png')} width={80} height={25} />
						</div>
						<div className="">
							<input className="px-2 rounded-lg border-0 w-[195px] h-[24px] text-sm" type={'text'} placeholder={'Search'} />
						</div>
					</div>
				</div>
				<div style={{ width: '100%%', margin: 'auto' }}>
					{/* TODO Fix the navbar not going the full distance on desktop */}
					{/* <Image
						alt="Horizontal line icon"
						src={require('../../../resources/images/horizontalline.png')}
						width={1380}
						height={3}
					/> */}
				</div>
			</nav>
		</header>
	)
}

export default Header
