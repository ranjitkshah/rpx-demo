import styles from '../../../styles/layout/mainLayout/Footer.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Navbar = () => {
	const router = useRouter()

	return (
		<footer>
			<div className={styles.footerNav}>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/main')
					}}
				>
					<div>
						<Image
							alt="Home Icon"
							src={require('../../../resources//images/home.png')}
							style={{ opacity: 0.85 }}
							width={30}
							height={34}
						/>
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/coins')
					}}
				>
					<div>
						<Image alt="Coins Icon" src={require('../../../resources//images/coin.png')} width={40} height={36} />
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/collectibles')
					}}
				>
					<div>
						<Image
							alt="Collectibles icon"
							src={require('../../../resources//images/collectibles.png')}
							width={60}
							height={36}
						/>
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/userprofile')
					}}
				>
					<div>
						<Image alt="My stuff icon" src={require('../../../resources//images/mystuff.png')} width={50} height={35} />
					</div>
				</div>
				<div
					className={styles.footerNavItem}
					onClick={() => {
						router.push('/more')
					}}
				>
					<div>
						<Image alt="More icon" src={require('../../../resources//images/more.png')} width={40} height={36} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Navbar
