import styles from '../../styles/pages/MyStuff.module.css'
import { ImageList, ImageListItem } from '@mui/material'
import collectibleImage from '../../resources/images/coins/collectible.png'

const DUMMY_COLLECTIBLES = [
	{
		id: 'c1'
	},
	{
		id: 'c2'
	},
	{
		id: 'c3'
	},
	{
		id: 'c4'
	},
	{
		id: 'c5'
	},
	{
		id: 'c6'
	},
	{
		id: 'c7'
	},
	{
		id: 'c8'
	},
	{
		id: 'c9'
	}
]

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
					<ImageListItem key={item.id}>
						<img src={collectibleImage.src} alt={item.id} loading="lazy" />
					</ImageListItem>
				))}
			</ImageList>
		</div>
	)
}

export default MyCollectibles
