import styles from '../../styles/pages/MyStuff.module.css'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import PersonIcon from '@mui/icons-material/Person'
import { LinearProgress } from '@mui/material'

type Props = {
	walletFunds: string
}

const MyStuff = ({ walletFunds }: Props) => {
	return (
		<div className={`${styles.section}`}>
			<CircleOutlinedIcon className={styles.circleIcon} />
			<PersonIcon className={styles.personIcon} />
			<h1 className={`${styles.sectionTitle} text-2xl`}>My Stuff</h1>
			<p className={styles.body1}>XP status</p>
			<div className="flex flex-row">
				<p className={styles.body2}>Level 2</p>
				<LinearProgress
					className={styles.progressBar}
					variant="determinate"
					value={25}
					color="secondary"
					style={{
						backgroundColor: '#000',
						color: '#a275ff',
						fontWeight: 600,
						height: '16px',
						width: '175px',
						marginTop: '10px',
						marginLeft: '10px'
					}}
				/>
			</div>
			<p className={styles.body1}>Current Wallet Funds</p>
			<p className={styles.body2}>${walletFunds}</p>
		</div>
	)
}

export default MyStuff
