import styles from '../../styles/pages/MyStuff.module.css'
import { ImageList, ImageListItem } from '@mui/material'
import blackSquareImage from '../../resources/images/coins/black-square.png'
import Image from 'next/image'

const DUMMY_COLLECTIBLES = Array.from({ length: 12 }, (_, index) => ({
	id: index + 1,
	isFiller: true,
	src: blackSquareImage.src
}))

const MyCollectibles = () => {
	return (
		<div>
			<h2 className={`${styles.greenText} text-2xl mb-4 ml-4`}>My Collectibles</h2>
			<ImageList
				sx={{
					width: '90vw',
					maxWidth: '400px',
					height: 410,
					backgroundColor: '#1F144C',
					padding: '1rem',
					border: '1px solid #FFF',
					borderRadius: 5,
					margin: '0 auto',
					gap: '7px'
				}}
				cols={4}
				rowHeight={30}
			>
				{DUMMY_COLLECTIBLES.map((item) => (
					<ImageListItem key={item?.id}>
						<Image
							width={82}
							height={117}
							style={{ width: '82px', height: '117px' }}
							src={item.src}
							alt={'A collectible'}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</div>
	)
}

export default MyCollectibles
