import styles from '../../styles/pages/MyStuff.module.css'
import { ImageList, ImageListItem } from '@mui/material'

const DUMMY_COINS = [
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

const DUMMY_COIN_IMG =
	'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Gold_coin_icon.png/640px-Gold_coin_icon.png'

const MyCoins = () => {
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
				rowHeight={30}
			>
				{DUMMY_COINS.map((item) => (
					<ImageListItem key={item.id}>
						<img
							src={`${DUMMY_COIN_IMG}?w=30&h=30&fit=crop&auto=format`}
							srcSet={`${DUMMY_COIN_IMG}?w=30&h=30&fit=crop&auto=format&dpr=2 2x`}
							alt={item.id}
							loading="lazy"
							className="max-w-[66px]"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</div>
	)
}

export default MyCoins
