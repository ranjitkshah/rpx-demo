import { Coin } from '@/shared/types'
import styles from '../../styles/pages/MyStuff.module.css'
import { ImageList, ImageListItem } from '@mui/material'
import Cr1msonAvenger from '../../resources/images/coins/Cr1msonAvenger.png'
import D3athBlow from '../../resources/images/coins/D3athBlow.png'
import DarkNightm4re from '../../resources/images/coins/DarkNightm4re.png'
import FuryFight3r from '../../resources/images/coins/FuryFight3r.png'
import Infern0Assassin from '../../resources/images/coins/Infern0Assassin.png'
import NightHunter from '../../resources/images/coins/NightHunter.png'
import R0gueRider from '../../resources/images/coins/R0gueRider.png'
import StealthSniper from '../../resources/images/coins/StealthSniper.png'
import ThunderB0ltz from '../../resources/images/coins/ThunderB0ltz.png'
import TitanWarrior188 from '../../resources/images/coins/TitanWarrior188.png'
import blackCircle from '../../resources/images/coins/black-circle.png'
import { fillArrayToLength } from '@/shared/utils'
import React from 'react'
import Image from 'next/image'

type Props = {
	coins: Coin[]
}

const coinsImageMap = {
	Cr1msonAvenger,
	D3athBlow,
	DarkNightm4re,
	FuryFight3r,
	Infern0Assassin,
	NightHunter,
	R0gueRider,
	StealthSniper,
	ThunderB0ltz,
	TitanWarrior188
}

const DUMMY_COLLECTIBLES = Array.from({ length: 12 }, (_, index) => ({
	id: index + 1,
	isFiller: true,
	src: blackCircle.src
}))

const MyCoins = ({ coins }: Props) => {
	const [mappedCoins, setMappedCoins] = React.useState<any[]>([])

	React.useEffect(() => {
		if (coins?.length) {
			const fullCoinsArray = fillArrayToLength(coins, 16, {
				isFiller: true,
				src: blackCircle.src
			})
			setMappedCoins(fullCoinsArray)
		} else {
			setMappedCoins(DUMMY_COLLECTIBLES)
		}
	}, [coins])

	console.log('==', { mappedCoins })

	return (
		<div>
			<h2 className={`${styles.greenText} text-2xl mb-4 ml-4`}>My Coins</h2>
			<ImageList
				sx={{
					width: '90vw',
					maxWidth: '400px',
					height: 350,
					backgroundColor: '#1F144C',
					padding: '1rem',
					border: '1px solid #FFF',
					borderRadius: 5,
					margin: '0 auto'
				}}
				cols={4}
				rowHeight={20}
			>
				{mappedCoins.map((item) => {
					// @ts-ignore
					if (item.isFiller) {
						return (
							<ImageListItem>
								<img
									// @ts-ignore
									src={item.src}
									// @ts-ignore
									srcSet={`${item?.src} 2x`}
									// alt={item.id}
									loading="lazy"
									className="max-w-[66px]"
								/>
							</ImageListItem>
						)
					} else {
						return (
							<ImageListItem>
								<Image
								 // @ts-ignore
									src={item?.creatorName in coinsImageMap ? coinsImageMap[item.creatorName]?.src : item?.imageUrl}
									alt={'sdfsfs'}
									width={50}
									height={50}
									// quality={100}
									// unoptimized
									className="max-w-[50px] max-h-[50px] rounded-full"
									objectFit="cover"
									 // @ts-ignore
								/>
								{/* <img
									// @ts-ignore
									src={item?.creatorName in coinsImageMap ? coinsImageMap[item.creatorName]?.src : item?.imageUrl}
									// @ts-ignore
									srcSet={`${item?.creatorName in coinsImageMap ? coinsImageMap[item.creatorName]?.src : item?.imageUrl} 2x`}
									// alt={item.id}
									loading="lazy"
									className="max-w-[66px]"
								/> */}
							</ImageListItem>
						)
					}
				})}
			</ImageList>
		</div>
	)
}

export default MyCoins
